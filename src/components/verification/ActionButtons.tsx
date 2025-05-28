
import React from 'react';
import { Check, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Ticket } from '@/services/ticketService';

interface ActionButtonsProps {
  ticket: Ticket;
  onMarkAdmitted: () => void;
  onMarkKitGiven: () => void;
}

const ActionButtons = ({ ticket, onMarkAdmitted, onMarkKitGiven }: ActionButtonsProps) => {
  return (
    <div className="flex space-x-4">
      <Button
        onClick={onMarkAdmitted}
        disabled={ticket.isAdmitted}
        className={`flex-1 relative ${
          ticket.isAdmitted 
            ? 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-200 dark:border-green-700' 
            : ''
        }`}
        variant={ticket.isAdmitted ? "secondary" : "default"}
      >
        <Check 
          className={`h-4 w-4 mr-2 ${
            ticket.isAdmitted 
              ? 'text-green-600 dark:text-green-400' 
              : ''
          }`} 
        />
        {ticket.isAdmitted ? 'Already Admitted' : 'Mark as Admitted'}
        {ticket.isAdmitted && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        )}
      </Button>
      
      <Button
        onClick={onMarkKitGiven}
        disabled={ticket.kitGiven}
        className={`flex-1 relative ${
          ticket.kitGiven 
            ? 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-200 dark:border-green-700' 
            : ''
        }`}
        variant={ticket.kitGiven ? "secondary" : "default"}
      >
        <Gift 
          className={`h-4 w-4 mr-2 ${
            ticket.kitGiven 
              ? 'text-green-600 dark:text-green-400' 
              : ''
          }`} 
        />
        {ticket.kitGiven ? 'Kit Already Given' : 'Mark Kit as Given'}
        {ticket.kitGiven && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        )}
      </Button>
    </div>
  );
};

export default ActionButtons;
