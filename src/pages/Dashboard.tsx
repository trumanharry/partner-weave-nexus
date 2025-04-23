
import React from "react";
import {
  Building2,
  Hospital,
  Users,
  UserRound,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDashboardStats } from "@/data/mockData";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  const stats = mockDashboardStats;

  return (
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-gray-500">
          Welcome to your Partner Ecosystem overview
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          title="Companies"
          value={stats.totalCompanies}
          icon={<Building2 className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Hospitals"
          value={stats.totalHospitals}
          icon={<Hospital className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Users"
          value={stats.activeUsers}
          icon={<Users className="h-6 w-6" />}
          description="Active users"
          trend={{ value: 0, isPositive: true }}
        />
        <StatCard
          title="Contacts"
          value={stats.totalContacts}
          icon={<UserRound className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Physicians"
          value={stats.totalPhysicians}
          icon={<Stethoscope className="h-6 w-6" />}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-center text-gray-500">
                  Partnership activity charts coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <RecentActivity activities={stats.recentActivity} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Partner Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center">
              <p className="text-center text-gray-500">
                Distribution visualization coming soon...
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center">
              <p className="text-center text-gray-500">
                User activity tracking coming soon...
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Top Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center">
              <p className="text-center text-gray-500">
                Points leaderboard coming soon...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
