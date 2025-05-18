import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig'; // Crie este arquivo com suas credenciais do Firebase

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Create Auth context
const AuthContext = createContext();

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);
  
  // Login function (original)
  const login = async (email, password) => {
    // In a real application, this would make an API call
    // For now, we'll simulate a successful login with mock data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userData = {
      id: 1,
      nome: 'João Silva',
      email: email,
      matricula: 'MAT12345',
      cargo: 'Analista Administrativo',
      perfil: 'servidor'
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    
    return userData;
  };
  
  // Login with Google
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userData = {
        id: user.uid,
        nome: user.displayName,
        email: user.email,
        matricula: 'MAT12345', // Substitua por dados reais do backend, se necessário
        cargo: 'Analista Administrativo', // Substitua por dados reais do backend, se necessário
        perfil: 'servidor' // Substitua por dados reais do backend, se necessário
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser(userData);
      
      return userData;
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      throw error;
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    auth.signOut(); // Logout do Firebase
  };
  
  // Register function (would be implemented in a real app)
  const register = async (userInfo) => {
    throw new Error('Registro não implementado nesta versão de demonstração');
  };
  
  // Forgot password function (would be implemented in a real app)
  const forgotPassword = async (email) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.' };
  };
  
  const value = {
    currentUser,
    loading,
    login,
    loginWithGoogle, // Nova função adicionada
    logout,
    register,
    forgotPassword
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};