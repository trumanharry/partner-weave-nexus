
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, FileDown, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockContacts, mockCompanies } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  lead: "bg-yellow-100 text-yellow-800",
};

const Contacts = () => {
  // Function to get company name by ID
  const getCompanyName = (companyId?: string) => {
    if (!companyId) return "N/A";
    const company = mockCompanies.find((c) => c.id === companyId);
    return company ? company.name : "N/A";
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contacts</h1>
          <p className="text-gray-500">Manage contact records</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Contacts</CardTitle>
              <CardDescription>
                Showing {mockContacts.length} contacts
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search contacts..."
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
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockContacts.map((contact) => (
                  <TableRow key={contact.id} className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={contact.avatar_url} />
                          <AvatarFallback>
                            {contact.first_name[0]}
                            {contact.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {contact.first_name} {contact.last_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {contact.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getCompanyName(contact.company_id)}</TableCell>
                    <TableCell>{contact.title || "N/A"}</TableCell>
                    <TableCell>
                      {contact.city}, {contact.state}
                    </TableCell>
                    <TableCell>
                      {contact.status && (
                        <Badge
                          variant="outline"
                          className={statusColors[contact.status]}
                        >
                          {contact.status}
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

export default Contacts;
