// ============================================
// AGROTECH | firebase.js
// Configuración de Firebase (Base de datos en la nube)
//
// ¿Qué hace este archivo?
//   - Conecta tu página a Firebase (Google) para guardar
//     y leer datos en tiempo real (Firestore).
//   - Expone la función global `window.saveContact`
//     que usa script.js cuando alguien llena el formulario.
//
// ⚠️  IMPORTANTE: Las claves de abajo son PÚBLICAS de Firebase
//     (diferente a claves secretas). De todas formas, se
//     recomienda usar variables de entorno en producción.
//     Nunca expongas claves de servicios de pago como
//     Stripe, OpenAI, etc.
// ============================================

import { initializeApp }              from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// -------------------------------------------------
// 1. PEGA AQUÍ TU CONFIGURACIÓN DE FIREBASE
//    Puedes obtenerla en: https://console.firebase.google.com
//    → Tu proyecto → ⚙️ Configuración → Aplicaciones web
// -------------------------------------------------
const firebaseConfig = {
    apiKey:            import.meta.env?.VITE_FIREBASE_API_KEY            ?? "TU_API_KEY",
    authDomain:        import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN        ?? "tu-proyecto.firebaseapp.com",
    projectId:         import.meta.env?.VITE_FIREBASE_PROJECT_ID         ?? "tu-proyecto-id",
    storageBucket:     import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET     ?? "tu-proyecto.appspot.com",
    messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "123456789",
    appId:             import.meta.env?.VITE_FIREBASE_APP_ID             ?? "1:123456789:web:abcdef",
};

// -------------------------------------------------
// 2. INICIALIZAR FIREBASE Y FIRESTORE
// -------------------------------------------------
let db;

try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("✅ Firebase conectado correctamente.");
} catch (error) {
    console.warn("⚠️ Firebase no está configurado. El formulario funcionará sin guardar datos.", error);
}

// -------------------------------------------------
// 3. FUNCIÓN GLOBAL: GUARDAR CONTACTO
//    Se usa desde script.js → submitContact()
// -------------------------------------------------
/**
 * Guarda un mensaje de contacto en la colección "contactos" de Firestore.
 * @param {{ name: string, email: string, message: string, timestamp: string }} data
 */
window.saveContact = async function(data) {
    if (!db) throw new Error("Firebase no está inicializado.");
    const docRef = await addDoc(collection(db, "contactos"), data);
    console.log("📩 Contacto guardado con ID:", docRef.id);
    return docRef.id;
};

// -------------------------------------------------
// 4. FUNCIÓN GLOBAL: GUARDAR PEDIDO (opcional)
//    Puedes llamarla desde checkout() en script.js
// -------------------------------------------------
/**
 * Guarda un pedido/cotización en Firestore.
 * @param {Array} cartItems - Lista de productos del carrito
 */
window.saveOrder = async function(cartItems) {
    if (!db) throw new Error("Firebase no está inicializado.");
    const docRef = await addDoc(collection(db, "pedidos"), {
        items: cartItems,
        status: "pendiente",
        timestamp: new Date().toISOString(),
    });
    console.log("🛒 Pedido guardado con ID:", docRef.id);
    return docRef.id;
};
