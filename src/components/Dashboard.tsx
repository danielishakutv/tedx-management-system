
import React from 'react';
import { Users, UserCheck, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TicketVerification from './TicketVerification';

const Dashboard = () => {
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Registration Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to TEDxYola Registration Desk. Manage attendee check-ins and event statistics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Ticket Verification Section */}
      <TicketVerification />
    </div>
  );
};

export default Dashboard;
