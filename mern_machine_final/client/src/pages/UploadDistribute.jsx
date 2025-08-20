import { useState } from 'react';
import http from '../api/http';
import Navbar from '../components/Navbar';
import React from 'react';
export default function UploadDistribute(){
  const [file,setFile]=useState(null);
  const [result,setResult]=useState(null);
  const [error,setError]=useState('');
  const upload=async(e)=>{ e.preventDefault(); setError(''); setResult(null); if(!file) return setError('Please choose a file'); const form = new FormData(); form.append('file', file); try{ const { data } = await http.post('/leads/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } }); setResult(data); }catch(err){ setError(err.response?.data?.message || err.message || 'Upload failed'); } };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Upload CSV / XLSX</h3>
          <form onSubmit={upload} className="space-y-3">
            <input type="file" accept=".csv,.xlsx,.xls" onChange={e=>setFile(e.target.files?.[0]||null)} />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Upload & Distribute</button>
          </form>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          {result && <div className="mt-4">
            <p className="font-medium">Batch ID: {result.batchId}</p>
            <ul className="mt-2">
              {result.summary.map(s=>(
                <li key={s.agentId}>{s.name ? s.name : ('Agent '+s.agentId)} {s.email ? `(${s.email})` : ''}: {s.count} items</li>
              ))}
            </ul>
          </div>}
        </div>
      </div>
    </div>
  );
}
