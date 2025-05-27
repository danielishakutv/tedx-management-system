
import React from 'react';
import { Users, UserCheck, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">
              Quick Check-In
            </CardTitle>
            <CardDescription>
              Scan QR codes or search for attendees to check them in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
              <UserCheck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">
                Check-in functionality will be available soon
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest registration and check-in activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">John Doe checked in</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">Jane Smith registered</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">Mike Johnson checked in</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">8 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
