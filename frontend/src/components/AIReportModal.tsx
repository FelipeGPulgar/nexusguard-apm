'use client';

import React from 'react';
import { Bot, X, ShieldAlert, Code2, CheckCircle2 } from 'lucide-react';
import { ThreatAlert } from './ThreatFeed';

interface AIReportModalProps {
  alert: ThreatAlert | null;
  onClose: () => void;
}

export default function AIReportModal({ alert, onClose }: AIReportModalProps) {
  if (!alert || !alert.diagnosis) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-cyber-card border border-cyber-border rounded-xl max-w-2xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800/50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-cyan-950 border border-cyber-neon rounded-lg glow-cyan">
            <Bot className="w-6 h-6 text-cyber-neon" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
              Gemini AI Security Sentinel Report
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              Amenaza: <span className="text-cyber-danger">{alert.threatType}</span> en {alert.serviceName} ({alert.endpoint})
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-800">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-cyber-danger" />
              Diagnóstico del Ataque
            </h4>
            <p className="text-sm text-gray-200 leading-relaxed">
              {alert.diagnosis.diagnosis}
            </p>
          </div>

          <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
            <h4 className="text-xs font-semibold text-cyber-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-cyber-accent" />
              Sugerencia de Parche de Código (Remediación Automática)
            </h4>
            <pre className="text-xs font-mono bg-black p-3 rounded text-green-400 overflow-x-auto border border-gray-800">
              <code>{alert.diagnosis.recommendedPatch}</code>
            </pre>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-gray-400 font-mono border-t border-gray-800">
            <span className="flex items-center gap-1 text-cyber-accent">
              <CheckCircle2 className="w-4 h-4" /> Severidad Nivel: {alert.diagnosis.severity}
            </span>
            <span>Acción: Aplicar filtro de validación en Backend</span>
          </div>
        </div>
      </div>
    </div>
  );
}
