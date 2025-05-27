
import React from 'react';
import { Label } from '@/components/ui/label';
import { type Ticket } from '@/services/ticketService';

interface TicketInfoProps {
  ticket: Ticket;
}

const TicketInfo = ({ ticket }: TicketInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Full Name
        </Label>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {ticket.name}
        </p>
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Email Address
        </Label>
        <p className="text-lg text-gray-900 dark:text-white">
          {ticket.email}
        </p>
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Phone Number
        </Label>
        <p className="text-lg text-gray-900 dark:text-white">
          {ticket.phoneNumber}
        </p>
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Ticket Type
        </Label>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          ticket.ticketType === 'VIP' 
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {ticket.ticketType}
        </span>
      </div>
    </div>
  );
};

export default TicketInfo;
