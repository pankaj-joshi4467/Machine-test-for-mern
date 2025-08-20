import { useEffect, useState } from 'react';
import http from '../api/http';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import React from 'react';
export default function Agents(){
  const [agents,setAgents]=useState([]);
  const [form,setForm]=useState({ name:'', email:'', mobile:'', password:'' });
  const [msg,setMsg]=useState('');
  const load=async()=>{ try{ const { data } = await http.get('/agents'); setAgents(data); }catch(e){ console.error(e); } };
  useEffect(()=>{ load(); }, []);
  const submit=async(e)=>{ e.preventDefault(); setMsg(''); try{ await http.post('/agents', form); setForm({ name:'', email:'', mobile:'', password:'' }); setMsg('Agent created'); load(); }catch(err){ setMsg(err.response?.data?.message || err.message || 'Failed'); } };
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Add Agent</h3>
            <form onSubmit={submit} className="space-y-3">
              <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
              <input className="w-full px-3 py-2 border rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              <input className="w-full px-3 py-2 border rounded" placeholder="Mobile (+cc)" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})}/>
              <input className="w-full px-3 py-2 border rounded" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
              <button className="w-full bg-green-600 text-white py-2 rounded">Add Agent</button>
              {msg && <p className="text-sm text-red-600 mt-2">{msg}</p>}
            </form>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Agent List</h3>
            <ul>
              {agents.map(a=>(
                <li key={a._id} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="font-medium">{a.name} {a.active ? <span className="text-sm text-green-600">●</span> : <span className="text-sm text-gray-400">●</span>}</div>
                    <div className="text-sm text-gray-600">{a.email} — {a.mobile}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={async()=>{ if(!confirm('Deactivate this agent?')) return; try{ await http.delete(`/agents/${a._id}`); load(); }catch(err){ setMsg(err.response?.data?.message || err.message || 'Failed'); } }} className="bg-yellow-500 text-white px-3 py-1 rounded">Deactivate</button>
                    <button onClick={async()=>{ try{ await http.patch(`/agents/${a._id}/toggle`); load(); }catch(err){ setMsg(err.response?.data?.message || err.message || 'Failed'); } }} className="bg-blue-600 text-white px-3 py-1 rounded">{a.active ? 'Disable' : 'Enable'}</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
