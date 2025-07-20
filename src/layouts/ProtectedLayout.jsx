import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/ui/Sidebar';
import HeaderComponent from '@/components/header';
import FooterComponent from '@/components/footer';

const ProtectedLayout = ({setIsStickyHeader}) => {
  const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  if (!user) return <Navigate to="/signin" replace />;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar 
        userEmail={user.email} 
        onClose={() => {}} 
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
        setIsStickyHeader={setIsStickyHeader}
      />
      <main className={`flex-1 overflow-auto transition-all duration-200 flex flex-col ${isSidebarCollapsed ? 'ml-16' : 'ml-80'}`}>
      {!isDashboard && <FooterComponent />}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
        {!isDashboard && <HeaderComponent />}
      </main>
    </div>
  );
};

export default ProtectedLayout;
