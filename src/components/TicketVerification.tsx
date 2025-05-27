
import React, { useState } from 'react';
import { Search, Check, X, Gift, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { findTicketBySerial, updateTicketStatus, type Ticket } from '@/services/ticketService';
import { useToast } from '@/hooks/use-toast';

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
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Ticket Verification</span>
          </CardTitle>
          <CardDescription>
            Enter or scan a ticket serial number to verify attendee information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="serialNumber" className="sr-only">
                Serial Number
              </Label>
              <Input
                id="serialNumber"
                placeholder="Enter Serial Number (e.g., TEDx2024001)"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg h-12"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              size="lg"
              className="px-8"
            >
              {isSearching ? "Searching..." : "Verify Ticket"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Information Section */}
      {currentTicket && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Attendee Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Full Name
                </Label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentTicket.name}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Email Address
                </Label>
                <p className="text-lg text-gray-900 dark:text-white">
                  {currentTicket.email}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Phone Number
                </Label>
                <p className="text-lg text-gray-900 dark:text-white">
                  {currentTicket.phoneNumber}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Ticket Type
                </Label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  currentTicket.ticketType === 'VIP' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {currentTicket.ticketType}
                </span>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentTicket.isAdmitted 
                    ? 'bg-green-100 dark:bg-green-900' 
                    : 'bg-red-100 dark:bg-red-900'
                }`}>
                  {currentTicket.isAdmitted ? (
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
                    currentTicket.isAdmitted 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {currentTicket.isAdmitted ? 'Admitted' : 'Not Admitted'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentTicket.kitGiven 
                    ? 'bg-green-100 dark:bg-green-900' 
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <Gift className={`h-4 w-4 ${
                    currentTicket.kitGiven 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Kit Status
                  </p>
                  <p className={`text-sm ${
                    currentTicket.kitGiven 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {currentTicket.kitGiven ? 'Kit Given' : 'Kit Not Given'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={handleMarkAdmitted}
                disabled={currentTicket.isAdmitted}
                className="flex-1"
                variant={currentTicket.isAdmitted ? "secondary" : "default"}
              >
                <Check className="h-4 w-4 mr-2" />
                {currentTicket.isAdmitted ? 'Already Admitted' : 'Mark as Admitted'}
              </Button>
              
              <Button
                onClick={handleMarkKitGiven}
                disabled={currentTicket.kitGiven}
                className="flex-1"
                variant={currentTicket.kitGiven ? "secondary" : "default"}
              >
                <Gift className="h-4 w-4 mr-2" />
                {currentTicket.kitGiven ? 'Kit Already Given' : 'Mark Kit as Given'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Demo Instructions */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            Demo Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 dark:text-blue-200 mb-2">
            Try these demo serial numbers:
          </p>
          <ul className="text-blue-700 dark:text-blue-300 space-y-1">
            <li><code>TEDx2024001</code> - John Doe (VIP, Not Admitted)</li>
            <li><code>TEDx2024002</code> - Jane Smith (Regular, Admitted)</li>
            <li><code>TEDx2024003</code> - Mike Johnson (VIP, Admitted + Kit Given)</li>
            <li><code>TEDx2024004</code> - Sarah Wilson (Regular, Not Admitted)</li>
            <li><code>TEDx2024005</code> - David Brown (VIP, Admitted)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketVerification;
