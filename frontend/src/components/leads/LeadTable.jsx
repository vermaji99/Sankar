import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Edit2, Trash2, Users } from 'lucide-react';
import { formatDate } from '../../lib/utils';

const LeadTable = ({ leads, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Converted': return <Badge variant="success">Converted</Badge>;
      case 'Interested': return <Badge variant="info">Interested</Badge>;
      case 'NotInterested': return <Badge variant="destructive">Not Interested</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Phone</TableHead>
            <TableHead className="font-semibold">Source</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Created At</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="group hover:bg-slate-50/50 transition-colors">
              <TableCell className="font-medium text-slate-900">{lead.name}</TableCell>
              <TableCell className="text-slate-600">{lead.phone}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize bg-slate-50">
                  {lead.source}
                </Badge>
              </TableCell>
              <TableCell>{getStatusBadge(lead.status)}</TableCell>
              <TableCell className="text-slate-500">{formatDate(lead.createdAt)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                    onClick={() => onEdit(lead)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(lead.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {leads.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12">
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <div className="p-4 bg-slate-50 rounded-full">
                    <Users className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="font-medium">No leads found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadTable;
