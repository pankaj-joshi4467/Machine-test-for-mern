import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import UploadDistribute from './pages/UploadDistribute';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
export default function App(){ return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/agents" element={<ProtectedRoute><Agents/></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><UploadDistribute/></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
); }
