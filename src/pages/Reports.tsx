
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileDown, ChevronDown } from "lucide-react";

const Reports = () => {
  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-gray-500">Generate and view reports</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          <TabsTrigger value="users">Users & Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Growth Report</CardTitle>
                <CardDescription>
                  Track growth across all entities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-center text-gray-500">
                    Growth chart coming soon...
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Date Range
                  </Button>
                  <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
                <CardDescription>User activity metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-center text-gray-500">
                    Activity chart coming soon...
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Date Range
                  </Button>
                  <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <CardTitle>Company Reports</CardTitle>
              <CardDescription>
                Analyze company distribution and metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-md border p-6">
                    <h3 className="mb-4 text-lg font-medium">
                      Companies by Type
                    </h3>
                    <div className="flex h-[200px] items-center justify-center">
                      <p className="text-center text-gray-500">
                        Chart coming soon...
                      </p>
                    </div>
                  </div>
                  <div className="rounded-md border p-6">
                    <h3 className="mb-4 text-lg font-medium">
                      Companies by Status
                    </h3>
                    <div className="flex h-[200px] items-center justify-center">
                      <p className="text-center text-gray-500">
                        Chart coming soon...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hospitals">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Reports</CardTitle>
              <CardDescription>Coming soon...</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-center text-gray-500">
                Hospital reporting will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User & Contact Reports</CardTitle>
              <CardDescription>Coming soon...</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-center text-gray-500">
                User and contact reporting will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
