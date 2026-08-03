# 🛡️ NexusGuard APM & AI Security Sentinel

![Firebase Hosting](https://img.shields.io/badge/Firebase-Hosting%20%26%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

> **Plataforma de Observabilidad y Ciberseguridad en Tiempo Real en la Nube de Google.**  
> NexusGuard monitorea el rendimiento de microservicios (RPS, latencia p95/p99, uso de CPU) y detecta ataques cibernéticos en vivo (SQL Injection, XSS, DDoS, Path Traversal) con diagnóstico y remedios de código por Inteligencia Artificial.

---

## 🌐 Demo Oficial en Vivo 24/7 (Google Cloud Infrastructure)

👉 **Live Demo:** [https://nexusguard-apm.web.app](https://nexusguard-apm.web.app)  
👉 **Mirror Link:** [https://nexusguard-apm.firebaseapp.com](https://nexusguard-apm.firebaseapp.com)

---

## ⚡ Características Principales (Senior Level)

* 📈 **Application Performance Monitoring (APM):** Telemetría en tiempo real de latencia, tráfico HTTP, uso de memoria y CPU.
* 🚨 **Sentinel de Ciberseguridad:** Motor heurístico que detecta intentos de SQL Injection, Cross-Site Scripting (XSS), ráfagas DDoS y navegación traversal no autorizada.
* 🤖 **Diagnóstico de Código por IA:** Integración con **Gemini AI** para generar análisis de vectores de ataque y parches de código remediadores en vivo.
* 🗄️ **Base de Datos Multicapa:** Conexión relacional **PostgreSQL (Supabase/Neon.tech)** + **Google Cloud Firestore Realtime DB**.
* ♾️ **Despliegue Continuo (CI/CD):** Automatizado mediante **GitHub Actions** hacia **Google Firebase Hosting**.

---

## 🏗️ Arquitectura del Sistema

```text
nexusguard-apm/
├── backend/                  # API Server Node.js + Express + TypeScript + PostgreSQL
│   ├── src/
│   │   ├── aiAgent.ts        # Integración Gemini AI Security Sentinel
│   │   ├── simulator.ts      # Motor de simulación de tráfico y ciberataques
│   │   └── server.ts         # Servidor REST & WebSockets
│   └── schema.sql            # Esquema relacional PostgreSQL
├── frontend/                 # Dashboard Cyberpunk en Next.js + TailwindCSS + Recharts
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   ├── components/       # Gráficos Recharts, Live Threat Feed, AI Modal
│   │   └── lib/firebase.ts   # Conexión Firestore Realtime DB
│   └── vercel.json
├── firebase.json             # Configuración oficial de Google Firebase Hosting
└── README.md
```

---

## 📜 Licencia
Desarrollado con ❤️ por **Felipe**. Licencia MIT.
