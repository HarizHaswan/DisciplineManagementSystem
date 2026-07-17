import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import LogOffence from './pages/LogOffence';
import Offences from './pages/Offences';
import WarningLetters from './pages/WarningLetters';

// Route protector with role checking
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070a13] text-[#e2e8f0]">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600/30 border-t-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If not authorized for this view, send teachers to student directory
    return <Navigate to="/students" replace />;
  }

  return children;
};

// Route wrapper that automatically injects the responsive navigation layout
const LayoutWrapper = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Area */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <LayoutWrapper>
                  <Dashboard />
                </LayoutWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/students"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <LayoutWrapper>
                  <Students />
                </LayoutWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/log-offence"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <LayoutWrapper>
                  <LogOffence />
                </LayoutWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/offences"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <LayoutWrapper>
                  <Offences />
                </LayoutWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/warning-letters"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER']}>
                <LayoutWrapper>
                  <WarningLetters />
                </LayoutWrapper>
              </ProtectedRoute>
            }
          />

          {/* Fallback Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
