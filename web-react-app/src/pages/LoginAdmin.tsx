import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginAdmin = ({ onLogin }: { onLogin: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            sessionStorage.setItem("esAdmin", "true");
            onLogin();
        } catch (error) {
            alert("Error al iniciar sesión: " + (error as any).message);
        }
    };

    return (
        <div className="login-admin">
            <h2>Iniciar sesión como Admin</h2>
            <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /><br />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />
            <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
    );
};

export default LoginAdmin;