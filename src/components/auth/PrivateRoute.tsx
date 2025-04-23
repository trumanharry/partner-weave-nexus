
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";

export default function PrivateRoute({ 
  children, 
  requireAdmin = false 
}: { 
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("PrivateRoute:", {
      path: location.pathname,
      isLoading: loading,
      hasUser: !!user,
      profile: profile ? {
        status: profile.status,
        role: profile.role
      } : null
    });
  }, [loading, user, profile, location.pathname]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    console.log("User not authenticated, redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }

  // Check if user profile exists
  if (!profile) {
    console.log("User profile not found, redirecting to /auth/pending");
    return <Navigate to="/auth/pending" replace />;
  }

  // Check if user profile is active
  if (profile.status !== 'active') {
    console.log("User profile not active, redirecting to /auth/pending");
    return <Navigate to="/auth/pending" replace />;
  }

  // Check if admin access is required
  if (requireAdmin && profile.role !== 'admin') {
    console.log("Admin access required, redirecting to /unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
