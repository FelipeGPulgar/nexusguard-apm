'use client';

import React from 'react';
import { Activity, Cpu, HardDrive, Server } from 'lucide-react';

interface SystemHealthProps {
  activeServicesCount: number;
  totalRequestsCount: number;
  avgLatencyMs: number;
  cpuPct: number;
}

export default function SystemHealth({
  activeServicesCount,
  totalRequestsCount,
  avgLatencyMs,
  cpuPct,
}: SystemHealthProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-cyber-card border border-cyber-border rounded-xl p-4 flex items-center justify-between glow-emerald">
        <div>
          <p className="text-xs text-gray-400 font-mono">Microservicios Activos</p>
          <h3 className="text-2xl font-bold text-cyber-accent font-mono mt-1">{activeServicesCount}</h3>
        </div>
        <div className="p-3 bg-emerald-950/60 border border-emerald-800/40 rounded-lg">
          <Server className="w-6 h-6 text-cyber-accent" />
        </div>
      </div>

      <div className="bg-cyber-card border border-cyber-border rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-mono">Peticiones Procesadas</p>
          <h3 className="text-2xl font-bold text-gray-100 font-mono mt-1">{totalRequestsCount}</h3>
        </div>
        <div className="p-3 bg-blue-950/60 border border-blue-800/40 rounded-lg">
          <Activity className="w-6 h-6 text-blue-400" />
        </div>
      </div>

      <div className="bg-cyber-card border border-cyber-border rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-mono">Latencia Promedio</p>
          <h3 className="text-2xl font-bold text-cyber-neon font-mono mt-1">{avgLatencyMs} ms</h3>
        </div>
        <div className="p-3 bg-cyan-950/60 border border-cyan-800/40 rounded-lg">
          <HardDrive className="w-6 h-6 text-cyber-neon" />
        </div>
      </div>

      <div className="bg-cyber-card border border-cyber-border rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-mono">Uso de CPU Cluster</p>
          <h3 className="text-2xl font-bold text-amber-400 font-mono mt-1">{cpuPct}%</h3>
        </div>
        <div className="p-3 bg-amber-950/60 border border-amber-800/40 rounded-lg">
          <Cpu className="w-6 h-6 text-amber-400" />
        </div>
      </div>
    </div>
  );
}
