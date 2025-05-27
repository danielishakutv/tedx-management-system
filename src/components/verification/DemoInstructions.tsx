
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DemoInstructions = () => {
  return (
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
  );
};

export default DemoInstructions;
