'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export interface MetricPoint {
  time: string;
  responseTimeMs: number;
  cpuUsagePct: number;
  statusCode: number;
}

interface MetricsChartProps {
  data: MetricPoint[];
}

export default function MetricsChart({ data }: MetricsChartProps) {
  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-5 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-100 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyber-accent animate-ping" />
            Latencia & Performance Telemetry (ms)
          </h2>
          <p className="text-xs text-gray-400">Peticiones HTTP en tiempo real enviadas al motor NexusGuard</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-cyber-accent">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-accent" /> Latencia (ms)
          </span>
          <span className="flex items-center gap-1.5 text-cyber-neon">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-neon" /> CPU (%)
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            Esperando transmisión de telemetría por WebSockets...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="time" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  borderColor: '#1F2937',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Area type="monotone" dataKey="responseTimeMs" stroke="#10B981" fillOpacity={1} fill="url(#colorLatency)" strokeWidth={2} />
              <Area type="monotone" dataKey="cpuUsagePct" stroke="#06B6D4" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
