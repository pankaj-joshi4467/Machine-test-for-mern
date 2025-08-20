import { useEffect, useState } from 'react';
import http from '../api/http';
import Navbar from '../components/Navbar';
import React from 'react';
import axios from 'axios';
export default function Dashboard(){
  const [leads,setLeads]=useState([]);
  const [batchId,setBatchId]=useState('');
  const load=async()=>{ try{ const { data } = await http.get('/leads', { params: batchId ? { batchId } : {} }); setLeads(data); }catch(e){ console.error(e); } };
  useEffect(()=>{ load(); }, [batchId]);

 const [loading, setLoading] = useState(false);

  const resetDashboard = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/reset");
    alert(res.data.message);

    // 🧹 Reset hone ke baad frontend state bhi clear kar do
    setLeads([]); 
  } catch (error) {
    console.error("Reset API Error:", error.response ? error.response.data : error.message);
    alert("Error resetting dashboard ❌");
  }
};

// Delete all leads function
const deleteAllLeads = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/deleteAll");
    alert(res.data.message);
    setLeads([]); // frontend state clear
  } catch (error) {
    console.error("Delete API Error:", error.response ? error.response.data : error.message);
    alert("Error deleting leads ❌");
  }
};


  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Distributed Leads</h2>
        <div className="flex gap-2 mb-4">
          <input placeholder="Filter by Batch ID" value={batchId} onChange={e=>setBatchId(e.target.value)} className="px-3 py-2 border rounded w-80"/>
          <button onClick={load} className="bg-blue-600 text-white px-4 py-2 rounded">Refresh</button> 
          <div >
      <button
        onClick={resetDashboard}
        disabled={loading}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        {loading ? "Resetting..." : "Reset Dashboard"}
      </button>
    </div>
    <div>
      <button 
  onClick={deleteAllLeads} 
  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition "
>
  Delete All Leads
</button>
    </div>

        </div>
        <div className="bg-white shadow rounded overflow-hidden border-gray-500">
          <table className="min-w-full">
            <thead className="bg-gray-300">
              <tr className='border-b border-gray-500'>
                <th className="text-left p-3">FirstName</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Notes</th>
                <th className="text-left p-3">Assigned Agent</th>
                <th className="text-left p-3">Batch</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(l=>(
                <tr key={l._id} className="border-t border-gray-500">
                  <td className="p-3">{l.firstName}</td>
                  <td className="p-3">{l.phone}</td>
                  <td className="p-3">{l.notes}</td>
                  <td className="p-3">{l.assignedTo?.name} ({l.assignedTo?.email})</td>
                  <td className="p-3">{l.batchId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
