
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
        className="flex-1"
        variant={ticket.isAdmitted ? "secondary" : "default"}
      >
        <Check className="h-4 w-4 mr-2" />
        {ticket.isAdmitted ? 'Already Admitted' : 'Mark as Admitted'}
      </Button>
      
      <Button
        onClick={onMarkKitGiven}
        disabled={ticket.kitGiven}
        className="flex-1"
        variant={ticket.kitGiven ? "secondary" : "default"}
      >
        <Gift className="h-4 w-4 mr-2" />
        {ticket.kitGiven ? 'Kit Already Given' : 'Mark Kit as Given'}
      </Button>
    </div>
  );
};

export default ActionButtons;
