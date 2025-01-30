import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  user: any;
}

const Navbar = ({ user }: NavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          onClick={() => navigate("/")} 
          className="text-2xl font-bold cursor-pointer"
        >
          Cinema Sorcery
        </h1>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="flex items-center gap-2">
                <User size={20} />
                {user.email}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2" size={20} />
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;