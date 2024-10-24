// src/app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { auth } from '@/lib/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/'; // Redirigir al home después del login
    } catch (e) {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  const handleRegister = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = '/'; // Redirigir al home después del registro
    } catch (e) {
      setError('Error al registrar el usuario.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition duration-200"
        >
          Ingresar
        </button>
        <p className="text-center">
          ¿No tienes una cuenta? 
          <button 
            type="button" 
            onClick={handleRegister} 
            className="text-blue-600 hover:underline mx-2"
          >
            Registrarse
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
