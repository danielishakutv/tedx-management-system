
import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface SearchSectionProps {
  serialNumber: string;
  setSerialNumber: (value: string) => void;
  onSearch: () => void;
  isSearching: boolean;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const SearchSection = ({ 
  serialNumber, 
  setSerialNumber, 
  onSearch, 
  isSearching, 
  onKeyPress 
}: SearchSectionProps) => {
  return (
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
              onKeyPress={onKeyPress}
              className="text-lg h-12"
            />
          </div>
          <Button 
            onClick={onSearch} 
            disabled={isSearching}
            size="lg"
            className="px-8"
          >
            {isSearching ? "Searching..." : "Verify Ticket"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchSection;
