// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAha1FtKnao38DZTSiI-VrYHSS3MIf_QvU",
  authDomain: "gatos-unidos.firebaseapp.com",
  projectId: "gatos-unidos",
  storageBucket: "gatos-unidos.firebasestorage.app",
  messagingSenderId: "67944965754",
  appId: "1:67944965754:web:479b3d8b35262abce43dc3",
  measurementId: "G-NHSSK8Q4H3"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Analytics (opcional)
const analytics = getAnalytics(app);

// Inicializa el servicio de autenticación y exporta
export const auth = getAuth(app);

export default app;