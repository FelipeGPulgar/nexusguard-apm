'use client';

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Shield, Radio, Sparkles } from 'lucide-react';
import MetricsChart, { MetricPoint } from '@/components/MetricsChart';
import ThreatFeed, { ThreatAlert } from '@/components/ThreatFeed';
import AIReportModal from '@/components/AIReportModal';
import SystemHealth from '@/components/SystemHealth';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';

export default function MissionControlDashboard() {
  const [metricsHistory, setMetricsHistory] = useState<MetricPoint[]>([]);
  const [alerts, setAlerts] = useState<ThreatAlert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<ThreatAlert | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [totalReqs, setTotalReqs] = useState(0);
  const [currentCpu, setCurrentCpu] = useState(24.5);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('⚡ Connected to NexusGuard WebSockets');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('metrics:tick', (data: any) => {
      setTotalReqs((prev) => prev + 1);
      setCurrentCpu(data.cpuUsagePct);

      setMetricsHistory((prev) => {
        const updated = [
          ...prev,
          {
            time: new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            responseTimeMs: data.responseTimeMs,
            cpuUsagePct: data.cpuUsagePct,
            statusCode: data.statusCode,
          },
        ];
        return updated.slice(-25); // Keep last 25 ticks
      });

      if (data.isThreat) {
        setAlerts((prev) => [data, ...prev].slice(0, 30));
      }
    });

    socket.on('alert:new', (alertData: ThreatAlert) => {
      setAlerts((prev) => [alertData, ...prev].slice(0, 30));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const avgLatency = metricsHistory.length
    ? Math.round(metricsHistory.reduce((acc, m) => acc + m.responseTimeMs, 0) / metricsHistory.length)
    : 0;

  return (
    <main className="min-h-screen bg-cyber-bg p-6 font-sans">
      {/* Top Header Navigation */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-cyber-border gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-950/80 border border-cyber-accent rounded-xl shadow-lg glow-emerald">
            <Shield className="w-8 h-8 text-cyber-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-wider text-gray-100 uppercase flex items-center gap-2">
              NexusGuard <span className="text-cyber-accent font-mono text-sm px-2 py-0.5 bg-emerald-950 border border-emerald-800 rounded">APM SENTINEL</span>
            </h1>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              Real-Time Security Observability & Gemini AI Diagnostics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-card border border-cyber-border font-mono text-xs">
            <Radio className={`w-4 h-4 ${isConnected ? 'text-cyber-accent animate-pulse' : 'text-cyber-danger'}`} />
            <span className={isConnected ? 'text-cyber-accent font-semibold' : 'text-cyber-danger'}>
              {isConnected ? 'LIVE WEBSOCKET STREAM' : 'DISCONNECTED'}
            </span>
          </div>

          <button
            onClick={() => {
              // Trigger a simulated threat view
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
