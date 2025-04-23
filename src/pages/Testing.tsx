
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestRunner from "@/components/testing/TestRunner";

const Testing = () => {
  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Testing</h1>
        <p className="mt-1 text-gray-500">
          Run tests to validate functionality of the partner ecosystem
        </p>
      </div>

      <Tabs defaultValue="scenarios">
        <TabsList>
          <TabsTrigger value="scenarios">Test Scenarios</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scenarios" className="mt-4">
          <TestRunner />
        </TabsContent>
        
        <TabsContent value="utilities" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Utilities</CardTitle>
              <CardDescription>Helper functions and tools for testing</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Testing utilities will be implemented in the future.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coverage" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Coverage</CardTitle>
              <CardDescription>View test coverage for the application</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Code coverage reports will be implemented in the future.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>RLS Policy Testing</CardTitle>
          <CardDescription>
            Test Row Level Security policies (requires Supabase integration)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            RLS policy testing requires an active Supabase connection. Once connected,
            you can validate that your security policies work properly for different user roles.
          </p>
          <Button disabled>Connect to Supabase</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Testing;
