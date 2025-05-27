
import React from 'react';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Ticket } from '@/services/ticketService';
import TicketInfo from './TicketInfo';
import StatusIndicators from './StatusIndicators';
import ActionButtons from './ActionButtons';

interface AttendeeCardProps {
  ticket: Ticket;
  onMarkAdmitted: () => void;
  onMarkKitGiven: () => void;
}

const AttendeeCard = ({ ticket, onMarkAdmitted, onMarkKitGiven }: AttendeeCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Attendee Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TicketInfo ticket={ticket} />
        <StatusIndicators ticket={ticket} />
        <ActionButtons 
          ticket={ticket}
          onMarkAdmitted={onMarkAdmitted}
          onMarkKitGiven={onMarkKitGiven}
        />
      </CardContent>
    </Card>
  );
};

export default AttendeeCard;
