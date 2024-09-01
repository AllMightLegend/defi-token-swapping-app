import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="py-4 px-8 bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold">DeFi Application</h1>
      </header>
      <main className="container mx-auto p-8">
        {children}
      </main>
      <footer className="py-4 px-8 bg-gray-800 text-center">
        <p>&copy; 2024 DeFi App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
