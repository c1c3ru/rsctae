import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Importação correta
import { CompetencyProvider } from './context/CompetencyContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import AppRoutes from './routes';

function App() {
  const { currentUser } = useAuth(); // Agora está DENTRO do AuthProvider
  const isAuthenticated = currentUser !== null;
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    // Remova o AuthProvider daqui
    <CompetencyProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {isAuthenticated && <Header />}
          <div className="flex flex-1 relative">
            {isAuthenticated && (
              <Sidebar 
                isExpanded={isSidebarExpanded}
                setIsExpanded={setIsSidebarExpanded}
              />
            )}
            <main className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
              isAuthenticated 
                ? isSidebarExpanded 
                  ? 'ml-64' 
                  : 'ml-16'
                : ''
            }`}>
              <AppRoutes isAuthenticated={isAuthenticated} />
            </main>
          </div>
        </div>
      </Router>
    </CompetencyProvider>
  );
}

export default App;