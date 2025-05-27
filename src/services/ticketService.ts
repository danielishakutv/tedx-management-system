
export interface Ticket {
  serialNumber: string;
  name: string;
  email: string;
  phoneNumber: string;
  ticketType: 'VIP' | 'Regular';
  isAdmitted: boolean;
  kitGiven: boolean;
}

// Demo ticket data
export const demoTickets: Ticket[] = [
  {
    serialNumber: 'TEDx2024001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phoneNumber: '+234 801 234 5678',
    ticketType: 'VIP',
    isAdmitted: false,
    kitGiven: false,
  },
  {
    serialNumber: 'TEDx2024002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phoneNumber: '+234 802 345 6789',
    ticketType: 'Regular',
    isAdmitted: true,
    kitGiven: false,
  },
  {
    serialNumber: 'TEDx2024003',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phoneNumber: '+234 803 456 7890',
    ticketType: 'VIP',
    isAdmitted: true,
    kitGiven: true,
  },
  {
    serialNumber: 'TEDx2024004',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phoneNumber: '+234 804 567 8901',
    ticketType: 'Regular',
    isAdmitted: false,
    kitGiven: false,
  },
  {
    serialNumber: 'TEDx2024005',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phoneNumber: '+234 805 678 9012',
    ticketType: 'VIP',
    isAdmitted: true,
    kitGiven: false,
  },
];

// Demo credentials
export const demoCredentials = {
  email: 'officer@tedxyola.com',
  password: 'password123',
  name: 'Registration Officer'
};

export const findTicketBySerial = (serialNumber: string): Ticket | undefined => {
  return demoTickets.find(ticket => 
    ticket.serialNumber.toLowerCase() === serialNumber.toLowerCase()
  );
};

export const updateTicketStatus = (serialNumber: string, updates: Partial<Pick<Ticket, 'isAdmitted' | 'kitGiven'>>): boolean => {
  const ticketIndex = demoTickets.findIndex(ticket => 
    ticket.serialNumber.toLowerCase() === serialNumber.toLowerCase()
  );
  
  if (ticketIndex !== -1) {
    demoTickets[ticketIndex] = { ...demoTickets[ticketIndex], ...updates };
    return true;
  }
  
  return false;
};
