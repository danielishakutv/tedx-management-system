
import React, { useState } from 'react';
import { Users, UserCheck, Calendar, BarChart3, List } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TicketVerification from './TicketVerification';
import TicketList from './TicketList';

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'verification' | 'list'>('verification');

  const stats = [
    {
      title: "Total Registered",
      value: "247",
      description: "Attendees registered",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Checked In",
      value: "183",
      description: "Currently at venue",
      icon: UserCheck,
      color: "text-green-600 dark:text-green-400"
    },
    {
      title: "Event Capacity",
      value: "300",
      description: "Maximum attendees",
      icon: Calendar,
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Check-in Rate",
      value: "74%",
      description: "Of registered attendees",
      icon: BarChart3,
      color: "text-red-600 dark:text-red-400"
    }
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Registration Dashboard
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Welcome to TEDxYola Registration Desk. Manage attendee check-ins and event statistics.
        </p>
      </div>

      {/* Stats Grid - Responsive layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 leading-tight">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color} flex-shrink-0`} />
              </CardHeader>
              <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation Tabs - Mobile optimized */}
      <div className="mb-4 sm:mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <Button
            variant={activeView === 'verification' ? 'default' : 'ghost'}
            onClick={() => setActiveView('verification')}
            className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm h-8 sm:h-10"
          >
            <UserCheck className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Ticket Verification</span>
            <span className="xs:hidden">Verify</span>
          </Button>
          <Button
            variant={activeView === 'list' ? 'default' : 'ghost'}
            onClick={() => setActiveView('list')}
            className="flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none text-xs sm:text-sm h-8 sm:h-10"
          >
            <List className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">All Tickets</span>
            <span className="xs:hidden">List</span>
          </Button>
        </div>
      </div>

      {/* Content Area */}
      {activeView === 'verification' ? <TicketVerification /> : <TicketList />}
    </div>
  );
};

export default Dashboard;
