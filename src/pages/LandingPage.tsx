
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to dashboard if already authenticated
  if (user) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex flex-1 items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-6xl">
            Partner Ecosystem
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Manage your business partnerships, track interactions, and grow your network
            all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate("/auth")} size="lg">
              Sign In
            </Button>
            <Button 
              onClick={() => navigate("/auth")} 
              variant="outline" 
              size="lg"
            >
              Create Account
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
