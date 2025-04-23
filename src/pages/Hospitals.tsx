
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
import { mockHospitals } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  prospect: "bg-yellow-100 text-yellow-800",
};

const typeLabels: Record<string, string> = {
  general: "General",
  specialized: "Specialized",
  teaching: "Teaching",
  psychiatric: "Psychiatric",
  rehabilitation: "Rehabilitation",
  other: "Other",
};

const Hospitals = () => {
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hospitals</h1>
          <p className="text-gray-500">Manage healthcare facilities</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Hospital
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Hospitals</CardTitle>
              <CardDescription>
                Showing {mockHospitals.length} hospitals
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search hospitals..."
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
                  <TableHead>Type</TableHead>
                  <TableHead>Beds</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHospitals.map((hospital) => (
                  <TableRow key={hospital.id} className="cursor-pointer">
                    <TableCell className="font-medium">
                      {hospital.name}
                    </TableCell>
                    <TableCell>
                      {hospital.type ? typeLabels[hospital.type] : "N/A"}
                    </TableCell>
                    <TableCell>{hospital.beds || "N/A"}</TableCell>
                    <TableCell>
                      {hospital.city}, {hospital.state}
                    </TableCell>
                    <TableCell>
                      {hospital.status && (
                        <Badge
                          variant="outline"
                          className={statusColors[hospital.status]}
                        >
                          {hospital.status}
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

export default Hospitals;
