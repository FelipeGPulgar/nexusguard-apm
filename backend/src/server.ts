import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { startTrafficSimulation, MetricPayload } from './simulator';
import { analyzeThreatWithAI, SecurityDiagnosis } from './aiAgent';
import { pool } from './config/database';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

const alertsHistory: Array<MetricPayload & { diagnosis?: SecurityDiagnosis }> = [];

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', system: 'NexusGuard APM Core', timestamp: new Date().toISOString() });
});

app.get('/api/alerts', (req, res) => {
  res.json(alertsHistory.slice(-20)); // Return last 20 alerts
});

// WebSocket Handling
io.on('connection', (socket) => {
  console.log(`🔌 Client connected to NexusGuard Real-Time Feed: ${socket.id}`);

  // Send current alert history to new clients
  socket.emit('alerts:init', alertsHistory.slice(-10));

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

// Start Traffic Simulation & Threat Intelligence
startTrafficSimulation(io, async (threatMetric) => {
  console.log(`🚨 THREAT TRIGGERED: ${threatMetric.threatType} on ${threatMetric.endpoint}`);
  
  // Analyze threat with Gemini AI Sentinel
  const diagnosis = await analyzeThreatWithAI(threatMetric);
  
  const enrichedAlert = {
    ...threatMetric,
    diagnosis
  };

  alertsHistory.push(enrichedAlert);
  if (alertsHistory.length > 100) alertsHistory.shift();

  // Broadcast high priority security alert to frontend
  io.emit('alert:new', enrichedAlert);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`
🛡️ ========================================================
🛡️ NexusGuard APM & AI Security Sentinel Engine Running!
🛡️ API Server: http://localhost:${PORT}
🛡️ Real-Time WebSocket Server Active
🛡️ ========================================================
  `);
});
