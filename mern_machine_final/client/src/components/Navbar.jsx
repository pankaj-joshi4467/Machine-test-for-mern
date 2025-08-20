import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
export default function Navbar(){ 
  const navigate = useNavigate();
  const logout = ()=>{ localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/login'); };
  const user = JSON.parse(localStorage.getItem('user')||'null');
  return (
    <div className="bg-gradient-to-r from-blue-300 to-purple-300 shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="font-bold text-lg">DashBoard</Link>
        <Link to="/agents" className="font-bold text-gray-600">Agents</Link>
        <Link to="/upload" className="font-bold text-gray-600">Upload</Link>
        <div className="ml-auto flex items-center gap-2">
          {user ? (<>
            <span className="text-sm text-gray-700">Hi, Admin</span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>) : (<Link to="/login" className="text-sm text-blue-600">Login</Link>)}
        </div>
      </div>
    </div>
  );
}
