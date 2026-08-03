import { GoogleGenAI } from '@google/genai';
import { MetricPayload } from './simulator';

export interface SecurityDiagnosis {
  threatType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  diagnosis: string;
  recommendedPatch: string;
}

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function analyzeThreatWithAI(metric: MetricPayload): Promise<SecurityDiagnosis> {
  console.log(`🤖 Gemini AI Security Sentinel analyzing threat: ${metric.threatType} on ${metric.endpoint}...`);

  if (!ai) {
    // Fallback simulation if no API key is provided
    return {
      threatType: metric.threatType || 'Security Anomaly',
      severity: metric.threatType === 'SQL Injection' ? 'CRITICAL' : 'HIGH',
      diagnosis: `[SIMULATED AI DIAGNOSIS] Detected unhandled payload "${metric.payloadSample}" targeting ${metric.endpoint}. Potential vulnerability in query parameter sanitization.`,
      recommendedPatch: `// Recommended Fix:\n// Use parameterized queries with pg/ORM:\nconst query = 'SELECT * FROM users WHERE id = $1';\nawait db.query(query, [sanitizedInput]);`
    };
  }

  try {
    const prompt = `You are an elite Cyber Security APM Sentinel AI.
Analyze the following security event detected in a web microservice:
- Service: ${metric.serviceName}
- Endpoint: ${metric.endpoint} (${metric.method})
- Threat Type: ${metric.threatType}
- Payload Sample: ${metric.payloadSample}
- Status Code: ${metric.statusCode}
- Response Time: ${metric.responseTimeMs}ms

Provide a response in JSON format with the following keys:
1. "severity": One of ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
2. "diagnosis": A concise 2-sentence explanation of the attack vector and security risk.
3. "recommendedPatch": A practical code snippet showing how to patch this vulnerability in Node.js/TypeScript.

Respond ONLY with valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text?.trim() || '';
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      threatType: metric.threatType || 'Security Anomaly',
      severity: parsed.severity || 'HIGH',
      diagnosis: parsed.diagnosis || 'Suspicious activity detected on critical endpoint.',
      recommendedPatch: parsed.recommendedPatch || '// Ensure proper input sanitization and rate limiting.'
    };
  } catch (error) {
    console.error('Error contacting Gemini AI, falling back to heuristic diagnosis:', error);
    return {
      threatType: metric.threatType || 'Security Anomaly',
      severity: 'HIGH',
      diagnosis: `Automated rule trigger: Detected ${metric.threatType} attack pattern on ${metric.endpoint}.`,
      recommendedPatch: `// Enforce strict input validation using Zod or Express-Validator\nconst schema = z.string().email();`
    };
  }
}
