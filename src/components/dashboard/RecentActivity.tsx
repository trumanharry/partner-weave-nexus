
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityItem from "./ActivityItem";

interface RecentActivityProps {
  activities: {
    id: string;
    type: "comment" | "rating" | "update" | "new";
    user: string;
    record: string;
    recordType: "company" | "hospital" | "user" | "contact" | "physician";
    timestamp: string;
    description: string;
  }[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-auto">
        {activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            type={activity.type}
            user={activity.user}
            record={activity.record}
            recordType={activity.recordType}
            timestamp={activity.timestamp}
            description={activity.description}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
