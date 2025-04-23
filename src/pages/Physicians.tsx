
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, FileDown, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockPhysicians } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  prospect: "bg-yellow-100 text-yellow-800",
};

const specialtyLabels: Record<string, string> = {
  cardiology: "Cardiology",
  dermatology: "Dermatology",
  endocrinology: "Endocrinology",
  gastroenterology: "Gastroenterology",
  neurology: "Neurology",
  oncology: "Oncology",
  orthopedics: "Orthopedics",
  pediatrics: "Pediatrics",
  psychiatry: "Psychiatry",
  radiology: "Radiology",
  surgery: "Surgery",
  urology: "Urology",
  other: "Other",
};

const Physicians = () => {
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Physicians</h1>
          <p className="text-gray-500">Manage physician records</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Physician
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Physicians</CardTitle>
              <CardDescription>
                Showing {mockPhysicians.length} physicians
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search physicians..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <FileDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPhysicians.map((physician) => (
                  <TableRow key={physician.id} className="cursor-pointer">
                    <TableCell className="font-medium">
                      {physician.first_name} {physician.last_name}
                    </TableCell>
                    <TableCell>
                      {specialtyLabels[physician.specialty] || physician.specialty}
                    </TableCell>
                    <TableCell>{physician.title || "N/A"}</TableCell>
                    <TableCell>
                      {physician.city}, {physician.state}
                    </TableCell>
                    <TableCell>
                      {physician.status && (
                        <Badge
                          variant="outline"
                          className={statusColors[physician.status]}
                        >
                          {physician.status}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Physicians;
