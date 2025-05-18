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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setCurrentUser(userData);
      } else {
        localStorage.removeItem('user');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
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
      cargo: 'Analista de TI',
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
        matricula: user.email, // Substitua por dados reais do backend, se necessário
        cargo: user.cargo, // Substitua por dados reais do backend, se necessário
        perfil: user.profile // Substitua por dados reais do backend, se necessário
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