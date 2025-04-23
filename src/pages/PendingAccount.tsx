
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function PendingAccount() {
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = "/auth";
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-600">Account Pending</h1>
          <p className="mt-4 text-gray-600">
            Your account is pending approval from an administrator. You'll be able to access
            the system once your account has been activated.
          </p>
          <p className="mt-2 text-gray-500">
            Please check back later or contact an administrator for assistance.
          </p>
        </div>
        <Button onClick={handleSignOut} className="w-full">
          Sign Out
        </Button>
      </div>
    </div>
  );
}
