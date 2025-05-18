import React from 'react';
import { NavLink } from 'react-router-dom';
import { CogIcon, ChartBarIcon, UserGroupIcon, HomeIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const navItems = [
    { to: '/', icon: HomeIcon, text: 'Dashboard' },
    { to: '/competencies', icon: ChartBarIcon, text: 'Competências' },
    { to: '/teams', icon: UserGroupIcon, text: 'Equipes' },
    { to: '/settings', icon: CogIcon, text: 'Configurações' }
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 pt-20 bg-white shadow-lg border-r z-30 transition-all duration-300 ${
      isExpanded ? 'w-64' : 'w-16'
    }`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-24 bg-white rounded-full p-1.5 shadow-md border hover:bg-gray-50"
      >
        {isExpanded ? (
          <span className="text-gray-600 text-sm">◀</span>
        ) : (
          <span className="text-gray-600 text-sm">▶</span>
        )}
      </button>

      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `flex items-center px-4 py-3 text-sm font-medium ${
              isActive 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className={`h-5 w-5 ${isExpanded ? 'mr-3' : 'mx-auto'}`} />
            {isExpanded && item.text}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;