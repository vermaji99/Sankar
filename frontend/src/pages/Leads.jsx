import React, { useState, useEffect, useCallback } from 'react';
import LeadTable from '../components/leads/LeadTable';
import LeadFilter from '../components/leads/LeadFilter';
import LeadFormModal from '../components/leads/LeadFormModal';
import api from '../api/axios';
import { Button } from '../components/ui/button';
import { Plus, Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status) params.append('status', status);
      
      const response = await api.get(`/leads?${params.toString()}`);
      setLeads(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch leads');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 500); // Debounce search

    return () => clearTimeout(timer);
  }, [fetchLeads]);

  const handleAddLead = () => {
    setEditingLead(null);
    setIsModalOpen(true);
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.delete(`/leads/${id}`);
        toast.success('Lead deleted successfully');
        fetchLeads();
      } catch (error) {
        toast.error('Failed to delete lead');
      }
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      setFormLoading(true);
      if (editingLead) {
        await api.patch(`/leads/${editingLead.id}`, data);
        toast.success('Lead updated successfully');
      } else {
        await api.post('/leads', data);
        toast.success('Lead added successfully');
      }
      setIsModalOpen(false);
      fetchLeads();
    } catch (error) {
      toast.error(editingLead ? 'Failed to update lead' : 'Failed to add lead');
    } finally {
      setFormLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Phone', 'Source', 'Status', 'Notes', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        `"${lead.name}"`,
        `"${lead.phone}"`,
        lead.source,
        lead.status,
        `"${lead.notes || ''}"`,
        new Date(lead.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Leads exported successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads Management</h1>
          <p className="text-slate-500">Manage, track and convert your business leads.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleExportCSV}
            className="border-slate-200 text-slate-600 hover:bg-slate-50"
            disabled={leads.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button 
            onClick={handleAddLead}
            className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      <LeadFilter 
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onClear={() => {
          setSearch('');
          setStatus('');
        }}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-dashed border-slate-300">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Loading leads...</p>
        </div>
      ) : (
        <LeadTable 
          leads={leads} 
          onEdit={handleEditLead} 
          onDelete={handleDeleteLead} 
        />
      )}

      <LeadFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        lead={editingLead}
        loading={formLoading}
      />
    </div>
  );
};

export default Leads;
