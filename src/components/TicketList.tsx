
import React, { useState, useMemo } from 'react';
import { Search, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { demoTickets, updateTicketStatus, type Ticket } from '@/services/ticketService';

const TicketList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketTypeFilter, setTicketTypeFilter] = useState('all');
  const [admittedFilter, setAdmittedFilter] = useState('all');
  const [kitGivenFilter, setKitGivenFilter] = useState('all');

  const filteredTickets = useMemo(() => {
    return demoTickets.filter(ticket => {
      const matchesSearch = 
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTicketType = ticketTypeFilter === 'all' || ticket.ticketType === ticketTypeFilter;
      
      const matchesAdmitted = 
        admittedFilter === 'all' || 
        (admittedFilter === 'yes' && ticket.isAdmitted) ||
        (admittedFilter === 'no' && !ticket.isAdmitted);
      
      const matchesKitGiven = 
        kitGivenFilter === 'all' || 
        (kitGivenFilter === 'yes' && ticket.kitGiven) ||
        (kitGivenFilter === 'no' && !ticket.kitGiven);

      return matchesSearch && matchesTicketType && matchesAdmitted && matchesKitGiven;
    });
  }, [searchTerm, ticketTypeFilter, admittedFilter, kitGivenFilter]);

  const handleToggleAdmitted = (serialNumber: string, currentStatus: boolean) => {
    updateTicketStatus(serialNumber, { isAdmitted: !currentStatus });
    // Force re-render by updating a state that triggers the useMemo
    setSearchTerm(prev => prev);
  };

  const handleToggleKitGiven = (serialNumber: string, currentStatus: boolean) => {
    updateTicketStatus(serialNumber, { kitGiven: !currentStatus });
    // Force re-render by updating a state that triggers the useMemo
    setSearchTerm(prev => prev);
  };

  const handleExportCSV = () => {
    // UI only for now - placeholder functionality
    console.log('Export CSV functionality to be implemented');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setTicketTypeFilter('all');
    setAdmittedFilter('all');
    setKitGivenFilter('all');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          All Tickets
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage all event tickets with filtering and search capabilities.
        </p>
      </div>

      {/* Search and Filters Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filters
          </CardTitle>
          <CardDescription>
            Use the search bar and filters below to find specific tickets.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name or serial number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={ticketTypeFilter} onValueChange={setTicketTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Ticket Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="Regular">Regular</SelectItem>
              </SelectContent>
            </Select>

            <Select value={admittedFilter} onValueChange={setAdmittedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Admitted Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="yes">Admitted</SelectItem>
                <SelectItem value="no">Not Admitted</SelectItem>
              </SelectContent>
            </Select>

            <Select value={kitGivenFilter} onValueChange={setKitGivenFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Kit Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="yes">Kit Given</SelectItem>
                <SelectItem value="no">Kit Not Given</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>

          {/* Export Actions */}
          <div className="flex gap-2 pt-2">
            <Button onClick={handleExportCSV} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              Showing {filteredTickets.length} of {demoTickets.length} tickets
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket List</CardTitle>
          <CardDescription>
            Complete list of all registered attendees and their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Admitted</TableHead>
                <TableHead>Kit Given</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.serialNumber}>
                  <TableCell className="font-mono text-sm">
                    {ticket.serialNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ticket.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {ticket.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ticket.ticketType === 'VIP' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {ticket.ticketType}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={ticket.isAdmitted}
                        onCheckedChange={() => handleToggleAdmitted(ticket.serialNumber, ticket.isAdmitted)}
                      />
                      <span className={`text-sm ${
                        ticket.isAdmitted 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {ticket.isAdmitted ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={ticket.kitGiven}
                        onCheckedChange={() => handleToggleKitGiven(ticket.serialNumber, ticket.kitGiven)}
                      />
                      <span className={`text-sm ${
                        ticket.kitGiven 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {ticket.kitGiven ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant={ticket.isAdmitted ? "outline" : "default"}
                        onClick={() => handleToggleAdmitted(ticket.serialNumber, ticket.isAdmitted)}
                        className="text-xs"
                      >
                        {ticket.isAdmitted ? 'Un-admit' : 'Admit'}
                      </Button>
                      <Button
                        size="sm"
                        variant={ticket.kitGiven ? "outline" : "default"}
                        onClick={() => handleToggleKitGiven(ticket.serialNumber, ticket.kitGiven)}
                        className="text-xs"
                      >
                        {ticket.kitGiven ? 'Remove Kit' : 'Give Kit'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredTickets.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No tickets found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketList;
