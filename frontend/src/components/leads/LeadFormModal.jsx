import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  X, 
  User, 
  Phone, 
  Tag, 
  Info, 
  FileText,
  Loader2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  source: z.enum(['Call', 'WhatsApp', 'Field']),
  status: z.enum(['Interested', 'NotInterested', 'Converted']),
  notes: z.string().optional(),
});

const LeadFormModal = ({ isOpen, onClose, onSubmit, lead = null, loading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      status: 'Interested',
      source: 'Call',
    },
  });

  useEffect(() => {
    if (lead) {
      reset(lead);
    } else {
      reset({
        name: '',
        phone: '',
        source: 'Call',
        status: 'Interested',
        notes: '',
      });
    }
  }, [lead, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-full max-w-lg shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-200">
        <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between p-6">
          <CardTitle className="text-xl font-bold text-slate-900">
            {lead ? 'Edit Lead' : 'Add New Lead'}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full hover:bg-white hover:shadow-sm"
          >
            <X className="w-5 h-5 text-slate-500" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" /> Full Name
                </label>
                <Input 
                  {...register('name')} 
                  placeholder="John Doe" 
                  className={errors.name ? 'border-red-500 focus-visible:ring-red-500/20' : ''}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-500" /> Phone Number
                </label>
                <Input 
                  {...register('phone')} 
                  placeholder="+1 (555) 000-0000" 
                  className={errors.phone ? 'border-red-500 focus-visible:ring-red-500/20' : ''}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-indigo-500" /> Source
                  </label>
                  <select 
                    {...register('source')}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="Call">Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Field">Field</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-500" /> Status
                  </label>
                  <select 
                    {...register('status')}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="Interested">Interested</option>
                    <option value="NotInterested">Not Interested</option>
                    <option value="Converted">Converted</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" /> Notes
                </label>
                <textarea 
                  {...register('notes')}
                  placeholder="Add any additional information here..."
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {lead ? 'Update Lead' : 'Save Lead'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadFormModal;
