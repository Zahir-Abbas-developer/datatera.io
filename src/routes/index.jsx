// src/AppRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from '@/components/authentication/signUp/Signup';
import EnterEmail from '@/components/authentication/forgotPassword/EnterEmail';
import TransformationTemplatesPage from '@/components/transformations/TransformationTemplatesPage';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import TransformationTable from '@/components/transformations/TransformationTable';

const Signin = lazy(() => import('@/components/authentication/signIn/Signin'));

const AppRoutes = () => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<EnterEmail />} />

      {/* Protected Routes with Sidebar */}
      {/* Protected Routes with Sidebar */}
  <Route element={<ProtectedLayout />}>
    <Route path="/dashboard" element={<TransformationTemplatesPage />} />
    <Route path="/transformation-table" element={<TransformationTable />} />
    {/* Add more protected routes here */}
  </Route>

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
