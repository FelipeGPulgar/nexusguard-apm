import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIJsdJTvYPSrCesKmIGDQstF-ErGTNl58",
  authDomain: "nexusguard-apm.firebaseapp.com",
  projectId: "nexusguard-apm",
  storageBucket: "nexusguard-apm.firebasestorage.app",
  messagingSenderId: "853048562151",
  appId: "1:853048562151:web:c2ac29af9162992e8eed42",
  measurementId: "G-TZ0P65J0S0"
};

// Initialize Firebase App (Singleton Pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collections
export const METRICS_COLLECTION = "metrics";
export const ALERTS_COLLECTION = "security_alerts";

// Realtime Listener for Firestore Security Alerts
export function subscribeToSecurityAlerts(callback: (alerts: any[]) => void) {
  const alertsRef = collection(db, ALERTS_COLLECTION);
  const q = query(alertsRef, orderBy("timestamp", "desc"), limit(25));

  return onSnapshot(q, (snapshot) => {
    const alerts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(alerts);
  });
}

// Function to Log Threat to Firestore Database
export async function logThreatToFirestore(alertData: any) {
  try {
    const alertsRef = collection(db, ALERTS_COLLECTION);
    await addDoc(alertsRef, {
      ...alertData,
      created_at: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving alert to Firestore:", error);
  }
}
