# 🛡️ NexusGuard APM & AI Security Sentinel

![Security Sentinel](https://img.shields.io/badge/Security-APM%20%26%20AI%20Sentinel-blueviolet?style=for-the-badge&logo=shield)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

> **Plataforma de Observabilidad y Seguridad en Tiempo Real con Diagnóstico por Inteligencia Artificial.**  
> NexusGuard monitorea el rendimiento de tus microservicios y detecta ataques cibernéticos (SQL Injections, XSS, DDoS, consumo anómalo de CPU/Scripting) ofreciendo parches de código automatizados generados por IA.

---

## ⚡ ¿Qué hace exactamente NexusGuard?

* 📈 **Monitoreo de Rendimiento (APM):** Mide la latencia en ms, uso de CPU/Memoria, peticiones procesadas y errores en tiempo real mediante WebSockets.
* 🚨 **Detección de Amenazas & Ciberataques:** Identifica solicitudes maliciosas en vivo (Inyecciones SQL, Scripting malicioso/XSS, ataques de denegación de servicio DDoS y accesos a archivos no autorizados).
* 🤖 **Inspector de Ciberseguridad con IA:** Analiza el payload del ataque con **Gemini AI** y te muestra el diagnóstico exacto y la sugerencia del **parche de código** listo para copiar y pegar.

---

## 📋 Requisitos para Funcionar

| Componente | Requisito | Notas |
| :--- | :--- | :--- |
| **Runtime** | Node.js v18+ | Motor principal del servidor y frontend |
| **Base de Datos** | PostgreSQL (Neon.tech o Local) | Almacena los esquemas de métricas e historial de alertas (`backend/schema.sql`) |
| **IA Sentinel** | Gemini API Key *(Opcional)* | Si no se proporciona clave en `.env`, se activa el motor de diagnóstico simulado sin costo |

---

## 🚀 Guía Rápida de Inicio

### 1. Clonar e Instalar Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Iniciar Centro de Comando Frontend
```bash
cd frontend
npm install
npm run dev
```

Abre **`http://localhost:3000`** en tu navegador para ver la telemetría en vivo.

---

## 🏗️ Arquitectura del Proyecto

```text
nexusguard-apm/
├── backend/                  # Servidor Express + WebSockets + Gemini AI Sentinel
│   ├── src/
│   │   ├── aiAgent.ts        # Motor de Análisis de Ciberseguridad con IA
│   │   ├── simulator.ts      # Generador de tráfico y ciberataques en tiempo real
│   │   └── server.ts         # WebSocket Server & REST API
│   └── schema.sql            # Esquema relacional PostgreSQL
├── frontend/                 # Dashboard Cyberpunk en Next.js
│   ├── src/app/              # Páginas y Layout
│   └── src/components/       # Gráficos Recharts, Feed de Alertas y Modal de IA
└── README.md
```

---

## 📜 Licencia
Desarrollado con ❤️ por **Felipe**. Licencia MIT.
