
import React from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const TopBar: React.FC = () => {
  return (
    <header className="border-b bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="relative flex w-full max-w-md items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-gray-50 pl-9"
          />
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full p-0"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                <DropdownMenuItem className="cursor-pointer p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New company added</p>
                    <p className="text-xs text-gray-500">
                      MedTech Solutions was added by Michael Davis
                    </p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Contact updated</p>
                    <p className="text-xs text-gray-500">
                      Emily Rogers' information was updated
                    </p>
                    <p className="text-xs text-gray-400">5 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New comment</p>
                    <p className="text-xs text-gray-500">
                      Alex Johnson commented on a physician record
                    </p>
                    <p className="text-xs text-gray-400">Yesterday</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center">
                <span className="text-sm font-medium text-partner-600">
                  View all notifications
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="h-8 w-8 rounded-full bg-partner-100 flex items-center justify-center text-partner-700 font-medium">
                  MD
                </div>
                <span className="hidden md:inline">Michael Davis</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
