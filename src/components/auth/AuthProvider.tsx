import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Define the structure of the user profile
interface UserProfile {
  id: string;
  user_id: string;
  role: string;
  status: string;
  first_name?: string;
  last_name?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  session: null, 
  profile: null,
  loading: true
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
      
      return data as UserProfile;
    } catch (error) {
      console.error("Exception fetching user profile:", error);
      return null;
    }
  };

  useEffect(() => {
    // Check if this is the first user
    const checkFirstUser = async () => {
      const { count, error } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact' });
      
      if (error) {
        console.error("Error checking first user:", error);
        return false;
      }
      
      return count === 1; // First user (includes the initial signup)
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to avoid potential deadlock with Supabase auth
          setTimeout(async () => {
            const profile = await fetchUserProfile(session.user.id);
            
            // If this is the first user, automatically set to active
            if (profile?.status === 'pending') {
              const isFirstUser = await checkFirstUser();
              
              if (isFirstUser) {
                const { error } = await supabase
                  .from('user_profiles')
                  .update({ status: 'active' })
                  .eq('user_id', session.user.id);
                
                if (error) {
                  console.error("Error updating first user status:", error);
                }
                
                // Refetch the updated profile
                const updatedProfile = await fetchUserProfile(session.user.id);
                setProfile(updatedProfile);
              } else {
                setProfile(profile);
              }
            } else {
              setProfile(profile);
            }
            
            setLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setProfile(profile);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
