import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [message, setMessage] = useState('');
  
  const { login, forgotPassword, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (forgotPasswordMode) {
      if (!email) {
        setError('Digite seu e-mail para recuperar a senha.');
        return;
      }
      
      try {
        setLoading(true);
        const result = await forgotPassword(email);
        setMessage(result.message);
        setLoading(false);
      } catch (err) {
        setError('Erro ao processar a solicitação. Tente novamente.');
        setLoading(false);
      }
      return;
    }
    
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao fazer login com Google. Tente novamente.');
      setGoogleLoading(false);
    }
  };
  
  const toggleForgotPassword = () => {
    setForgotPasswordMode(!forgotPasswordMode);
    setError('');
    setMessage('');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-700 p-6">
          <h1 className="text-white text-center text-2xl font-bold">
            Sistema de Cálculo de Pontuação
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Progressão Funcional
          </p>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold text-center mb-6">
            {forgotPasswordMode ? 'Recuperar Senha' : 'Login'}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {!forgotPasswordMode && (
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            
            <div className="flex items-center justify-between mb-6">
              <button
                type="submit"
                className={`bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Processando...' : forgotPasswordMode ? 'Enviar E-mail de Recuperação' : 'Entrar'}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center text-gray-600">
            Ou faça login com:
          </div>
          <div className="mt-2">
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className={`w-full py-2 px-4 rounded flex items-center justify-center ${googleLoading ? 'opacity-50 cursor-not-allowed bg-gray-300' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              {googleLoading ? (
                'Conectando...'
              ) : (
                <>
                  <img src="/google-logo.svg" alt="Google" className="w-5 h-5 mr-2" />
                  Login com Google
                </>
              )}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={toggleForgotPassword}
              className="text-blue-700 text-sm hover:text-blue-800"
            >
              {forgotPasswordMode ? 'Voltar para o Login' : 'Esqueceu sua senha?'}
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-xs">
            <p>© 2025 Sistema de Cálculo de Pontuação para Progressão Funcional</p>
            <p className="mt-1">Versão 1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;