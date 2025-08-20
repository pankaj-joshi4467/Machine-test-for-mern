import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../api/http';
import React from 'react';
export default function Login(){
  const [email,setEmail]=useState('admin@example.com');
  const [password,setPassword]=useState('Admin@123');
  const [error,setError]=useState('');
  const navigate=useNavigate();
  const submit=async(e)=>{ e.preventDefault(); setError(''); try{ const { data } = await http.post('/auth/login',{ email, password }); localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); navigate('/'); }catch(err){ setError(err.response?.data?.message || err.message || 'Login failed'); } };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full bg-white p-8 rounded shadow border-gray-500">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2 border rounded" placeholder="Email" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-2 border rounded" placeholder="Password" />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
