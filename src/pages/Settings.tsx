
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Configure your Partner Ecosystem</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="fields">Custom Fields</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>
                Manage your organization details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    placeholder="Enter your organization name"
                    defaultValue="Partner Ecosystem"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-domain">Domain</Label>
                  <Input
                    id="org-domain"
                    placeholder="yourdomain.com"
                    defaultValue="partnerecosystem.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-email">Admin Email</Label>
                  <Input
                    id="org-email"
                    type="email"
                    placeholder="admin@yourdomain.com"
                    defaultValue="admin@partnerecosystem.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="comments-feature">Enable Comments</Label>
                      <p className="text-sm text-gray-500">
                        Allow users to comment on records
                      </p>
                    </div>
                    <Switch id="comments-feature" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ratings-feature">Enable Ratings</Label>
                      <p className="text-sm text-gray-500">
                        Allow users to rate records
                      </p>
                    </div>
                    <Switch id="ratings-feature" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="points-feature">Enable Points</Label>
                      <p className="text-sm text-gray-500">
                        Enable gamification with points
                      </p>
                    </div>
                    <Switch id="points-feature" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Configure user roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Role Permissions</h3>
                  <p className="text-sm text-gray-500">
                    Define what users can do based on their role
                  </p>

                  <div className="mt-4 space-y-4">
                    <div className="rounded-md border p-4">
                      <h4 className="text-md font-medium">Administrators</h4>
                      <p className="text-sm text-gray-500">
                        Full access to all features and records
                      </p>
                    </div>
                    <div className="rounded-md border p-4">
                      <h4 className="text-md font-medium">Corporate</h4>
                      <p className="text-sm text-gray-500">
                        Access to assigned companies and related records
                      </p>
                    </div>
                    <div className="rounded-md border p-4">
                      <h4 className="text-md font-medium">Distributors</h4>
                      <p className="text-sm text-gray-500">
                        Limited access to view assigned hospital records
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Manage Roles</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fields">
          <Card>
            <CardHeader>
              <CardTitle>Custom Fields</CardTitle>
              <CardDescription>
                Define additional fields for your records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-center text-gray-500">
                Custom field configuration will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect to third-party services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-center text-gray-500">
                Integration options will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
