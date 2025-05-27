
import React from 'react';
import { Check, X, Gift } from 'lucide-react';
import { type Ticket } from '@/services/ticketService';

interface StatusIndicatorsProps {
  ticket: Ticket;
}

const StatusIndicators = ({ ticket }: StatusIndicatorsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center space-x-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          ticket.isAdmitted 
            ? 'bg-green-100 dark:bg-green-900' 
            : 'bg-red-100 dark:bg-red-900'
        }`}>
          {ticket.isAdmitted ? (
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : (
            <X className="h-4 w-4 text-red-600 dark:text-red-400" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            Admission Status
          </p>
          <p className={`text-sm ${
            ticket.isAdmitted 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {ticket.isAdmitted ? 'Admitted' : 'Not Admitted'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          ticket.kitGiven 
            ? 'bg-green-100 dark:bg-green-900' 
            : 'bg-gray-100 dark:bg-gray-800'
        }`}>
          <Gift className={`h-4 w-4 ${
            ticket.kitGiven 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-gray-400'
          }`} />
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            Kit Status
          </p>
          <p className={`text-sm ${
            ticket.kitGiven 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {ticket.kitGiven ? 'Kit Given' : 'Kit Not Given'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusIndicators;
