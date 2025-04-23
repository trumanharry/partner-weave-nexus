
import React from "react";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Star,
  RefreshCw,
  Plus,
  UserRound,
  Building2,
  Hospital,
  Stethoscope,
  Users,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityItemProps {
  type: "comment" | "rating" | "update" | "new";
  user: string;
  record: string;
  recordType: "company" | "hospital" | "user" | "contact" | "physician";
  timestamp: string;
  description: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  user,
  record,
  recordType,
  timestamp,
  description,
}) => {
  const getIcon = () => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4" />;
      case "rating":
        return <Star className="h-4 w-4" />;
      case "update":
        return <RefreshCw className="h-4 w-4" />;
      case "new":
        return <Plus className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "comment":
        return "bg-blue-100 text-blue-600";
      case "rating":
        return "bg-yellow-100 text-yellow-600";
      case "update":
        return "bg-purple-100 text-purple-600";
      case "new":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getRecordIcon = () => {
    switch (recordType) {
      case "company":
        return <Building2 className="h-4 w-4" />;
      case "hospital":
        return <Hospital className="h-4 w-4" />;
      case "user":
        return <Users className="h-4 w-4" />;
      case "contact":
        return <UserRound className="h-4 w-4" />;
      case "physician":
        return <Stethoscope className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const getRecordTypeColor = () => {
    switch (recordType) {
      case "company":
        return "bg-indigo-100 text-indigo-600";
      case "hospital":
        return "bg-red-100 text-red-600";
      case "user":
        return "bg-blue-100 text-blue-600";
      case "contact":
        return "bg-green-100 text-green-600";
      case "physician":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex items-start gap-3 border-b border-gray-100 py-3 last:border-0">
      <div
        className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
          getIconColor()
        )}
      >
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{user}</span>{" "}
          <span className="text-gray-500">{description}</span>
        </p>
        <div className="mt-1 flex items-center gap-1">
          <div
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full",
              getRecordTypeColor()
            )}
          >
            {getRecordIcon()}
          </div>
          <span className="truncate text-xs font-medium">{record}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
