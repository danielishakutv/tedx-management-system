
import React, { useState } from 'react';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onLogout={handleLogout} />
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
