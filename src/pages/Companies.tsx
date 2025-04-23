
import React, { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, FileDown, Filter, Search, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCompanies } from "@/hooks/useCompanies";
import { Spinner } from "@/components/ui/spinner";
import CompanyForm from "@/components/companies/CompanyForm";
import type { Company } from "@/types";

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  prospect: "bg-yellow-100 text-yellow-800",
  former: "bg-red-100 text-red-800",
};

const Companies = () => {
  const { companies, isLoading, error, createCompany, updateCompany, deleteCompany } = useCompanies();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [deletingCompany, setDeletingCompany] = useState<Company | null>(null);

  const handleCreateCompany = async (data: Partial<Company>) => {
    await createCompany.mutateAsync(data);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateCompany = async (data: Partial<Company>) => {
    if (editingCompany) {
      await updateCompany.mutateAsync({ ...data, id: editingCompany.id });
      setEditingCompany(null);
    }
  };

  const handleDeleteCompany = async () => {
    if (deletingCompany) {
      await deleteCompany.mutateAsync(deletingCompany.id);
      setDeletingCompany(null);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="rounded-lg bg-red-50 p-4 text-red-800">
          Error loading companies: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Companies</h1>
          <p className="text-gray-500">
            Manage corporate and distributor companies
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Companies</CardTitle>
              <CardDescription>
                Showing {companies?.length || 0} companies
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search companies..."
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
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="table-container">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Revenue Tier</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies?.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell className="capitalize">
                        {company.company_type || "N/A"}
                      </TableCell>
                      <TableCell>{company.industry || "N/A"}</TableCell>
                      <TableCell>
                        {company.status && (
                          <Badge
                            variant="outline"
                            className={statusColors[company.status]}
                          >
                            {company.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="capitalize">
                        {company.revenue_tier
                          ? company.revenue_tier.replace("-", " ")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingCompany(company)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeletingCompany(company)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Company Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Company</DialogTitle>
            <DialogDescription>
              Add a new company to your ecosystem
            </DialogDescription>
          </DialogHeader>
          <CompanyForm
            onSubmit={handleCreateCompany}
            onCancel={() => setIsCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Company Dialog */}
      <Dialog open={!!editingCompany} onOpenChange={() => setEditingCompany(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
            <DialogDescription>
              Update company information
            </DialogDescription>
          </DialogHeader>
          {editingCompany && (
            <CompanyForm
              company={editingCompany}
              onSubmit={handleUpdateCompany}
              onCancel={() => setEditingCompany(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Company Dialog */}
      <AlertDialog open={!!deletingCompany} onOpenChange={() => setDeletingCompany(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the company
              {deletingCompany?.name ? ` "${deletingCompany.name}"` : ""} and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingCompany(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCompany}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Companies;
