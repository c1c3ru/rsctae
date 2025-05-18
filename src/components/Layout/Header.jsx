import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl">
            <Link to="/dashboard">Sistema de Cálculo de Pontuação</Link>
          </h1>
        </div>
        {currentUser && (
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <div className="font-medium">{currentUser.nome}</div>
              <div className="text-xs opacity-80">{currentUser.matricula}</div>
            </div>
            <div className="relative group">
              <button className="rounded-full bg-blue-800 p-2 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Dashboard
                </Link>
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Meu Perfil
                </Link>
                <button 
                  onClick={logout} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;