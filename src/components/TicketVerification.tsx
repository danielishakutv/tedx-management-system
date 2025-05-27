
import React, { useState } from 'react';
import { findTicketBySerial, updateTicketStatus, type Ticket } from '@/services/ticketService';
import { useToast } from '@/hooks/use-toast';
import SearchSection from './verification/SearchSection';
import AttendeeCard from './verification/AttendeeCard';
import DemoInstructions from './verification/DemoInstructions';

const TicketVerification = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!serialNumber.trim()) {
      toast({
        title: "Serial Number Required",
        description: "Please enter a ticket serial number",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const ticket = findTicketBySerial(serialNumber.trim());
      setCurrentTicket(ticket || null);
      setIsSearching(false);
      
      if (!ticket) {
        toast({
          title: "Ticket Not Found",
          description: "No ticket found with this serial number",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Ticket Found",
          description: `Ticket for ${ticket.name} loaded successfully`,
        });
      }
    }, 500);
  };

  const handleMarkAdmitted = () => {
    if (!currentTicket) return;
    
    const success = updateTicketStatus(currentTicket.serialNumber, { isAdmitted: true });
    if (success) {
      setCurrentTicket({ ...currentTicket, isAdmitted: true });
      toast({
        title: "Status Updated",
        description: `${currentTicket.name} has been marked as admitted`,
      });
    }
  };

  const handleMarkKitGiven = () => {
    if (!currentTicket) return;
    
    const success = updateTicketStatus(currentTicket.serialNumber, { kitGiven: true });
    if (success) {
      setCurrentTicket({ ...currentTicket, kitGiven: true });
      toast({
        title: "Kit Status Updated",
        description: `Kit marked as given to ${currentTicket.name}`,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <SearchSection
        serialNumber={serialNumber}
        setSerialNumber={setSerialNumber}
        onSearch={handleSearch}
        isSearching={isSearching}
        onKeyPress={handleKeyPress}
      />

      {currentTicket && (
        <AttendeeCard
          ticket={currentTicket}
          onMarkAdmitted={handleMarkAdmitted}
          onMarkKitGiven={handleMarkKitGiven}
        />
      )}

      <DemoInstructions />
    </div>
  );
};

export default TicketVerification;
