import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Import = () => {
  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Import Data</h1>
        <p className="text-gray-500">Upload and import data from CSV files</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Import Guidance</AlertTitle>
        <AlertDescription>
          Please ensure your CSV files match the expected format. Download
          templates from the tabs below.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="companies" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="physicians">Physicians</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <CardTitle>Import Companies</CardTitle>
              <CardDescription>
                Upload company data from a CSV file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full py-8">
                <div className="flex flex-col items-center">
                  <FileUp className="mb-2 h-10 w-10 text-gray-400" />
                  <p className="text-lg font-medium">Drop CSV file here</p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                </div>
              </Button>

              <div className="flex justify-between">
                <Button variant="outline">Download Template</Button>
                <Button disabled>
                  <Upload className="mr-2 h-4 w-4" /> Upload & Import
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hospitals">
          <Card>
            <CardHeader>
              <CardTitle>Import Hospitals</CardTitle>
              <CardDescription>
                Upload hospital data from a CSV file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full py-8">
                <div className="flex flex-col items-center">
                  <FileUp className="mb-2 h-10 w-10 text-gray-400" />
                  <p className="text-lg font-medium">Drop CSV file here</p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                </div>
              </Button>

              <div className="flex justify-between">
                <Button variant="outline">Download Template</Button>
                <Button disabled>
                  <Upload className="mr-2 h-4 w-4" /> Upload & Import
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Import Contacts</CardTitle>
              <CardDescription>Coming soon...</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-gray-500">
                Contact import functionality will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="physicians">
          <Card>
            <CardHeader>
              <CardTitle>Import Physicians</CardTitle>
              <CardDescription>Coming soon...</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-gray-500">
                Physician import functionality will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Import Users</CardTitle>
              <CardDescription>Coming soon...</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-gray-500">
                User import functionality will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Import;
