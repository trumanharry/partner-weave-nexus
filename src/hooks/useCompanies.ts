
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Company } from "@/types";

export const useCompanies = () => {
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

  return {
    companies,
    isLoading,
    error,
  };
};
