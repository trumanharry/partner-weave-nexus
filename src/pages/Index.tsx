
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return null;
};

export default Index;
