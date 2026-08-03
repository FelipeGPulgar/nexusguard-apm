'use client';

import React from 'react';
import { ShieldAlert, ShieldCheck, Terminal, Bot } from 'lucide-react';

export interface ThreatAlert {
  serviceName: string;
  endpoint: string;
  method: string;
  statusCode: number;
  threatType?: string;
  payloadSample?: string;
  timestamp: string;
  isThreat: boolean;
  diagnosis?: {
    severity: string;
    diagnosis: string;
    recommendedPatch: string;
  };
}

interface ThreatFeedProps {
  alerts: ThreatAlert[];
  onSelectAlert: (alert: ThreatAlert) => void;
}

export default function ThreatFeed({ alerts, onSelectAlert }: ThreatFeedProps) {
  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-5 shadow-2xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-100 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-cyber-danger animate-pulse" />
          Live Security & Threat Stream
        </h2>
        <span className="text-xs px-2.5 py-1 rounded-full bg-red-950 text-cyber-danger border border-red-800/50 font-mono">
          {alerts.filter(a => a.isThreat).length} Amenazas Detectadas
        </span>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1 max-h-[420px] pr-1">
        {alerts.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm">
            Monitoreando tráfico en busca de anomalías cibernéticas...
          </div>
        ) : (
          alerts.map((alert, idx) => (
            <div
              key={idx}
              onClick={() => alert.diagnosis && onSelectAlert(alert)}
              className={`p-3.5 rounded-lg border transition-all duration-200 ${
                alert.isThreat
                  ? 'bg-red-950/20 border-red-800/60 hover:bg-red-900/30 cursor-pointer glow-red'
                  : 'bg-gray-900/40 border-cyber-border hover:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {alert.isThreat ? (
                    <ShieldAlert className="w-4 h-4 text-cyber-danger" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-cyber-accent" />
                  )}
                  <span className="font-mono text-xs font-semibold text-gray-200">
                    {alert.serviceName}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 font-mono text-gray-300">
                    {alert.method} {alert.endpoint}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gray-500">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>

              {alert.isThreat && (
                <div className="mt-2 pl-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyber-danger">
                    <span>⚠️ {alert.threatType}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-900 text-red-200 font-bold">
                      {alert.diagnosis?.severity || 'HIGH'}
                    </span>
                  </div>
                  {alert.payloadSample && (
                    <p className="text-[11px] font-mono text-gray-400 mt-1 bg-black/40 p-1.5 rounded truncate">
                      <Terminal className="w-3 h-3 inline mr-1 text-gray-500" />
                      {alert.payloadSample}
                    </p>
                  )}
                  {alert.diagnosis && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-cyber-neon font-medium">
                      <Bot className="w-3.5 h-3.5" />
                      <span>Diagnóstico por IA de Gemini disponible (Haz clic para ver parche)</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
