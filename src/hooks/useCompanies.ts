
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Company } from "@/types";
import { toast } from "sonner";

export const useCompanies = () => {
  const queryClient = useQueryClient();

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ["companies"],
    queryFn: async (): Promise<Company[]> => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const createCompany = useMutation({
    mutationFn: async (newCompany: Partial<Company>) => {
      // Ensure name is provided (required by the database schema)
      if (!newCompany.name) {
        throw new Error("Company name is required");
      }
      
      const { data, error } = await supabase
        .from("companies")
        .insert({
          name: newCompany.name,
          industry: newCompany.industry,
          company_type: newCompany.company_type,
          revenue_tier: newCompany.revenue_tier,
          website: newCompany.website,
          email: newCompany.email,
          phone: newCompany.phone,
          status: newCompany.status,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company created successfully");
    },
    onError: (error) => {
      toast.error(`Error creating company: ${error.message}`);
    },
  });

  const updateCompany = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Company> & { id: string }) => {
      const { data, error } = await supabase
        .from("companies")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company updated successfully");
    },
    onError: (error) => {
      toast.error(`Error updating company: ${error.message}`);
    },
  });

  const deleteCompany = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("companies").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast.success("Company deleted successfully");
    },
    onError: (error) => {
      toast.error(`Error deleting company: ${error.message}`);
    },
  });

  return {
    companies,
    isLoading,
    error,
    createCompany,
    updateCompany,
    deleteCompany,
  };
};
