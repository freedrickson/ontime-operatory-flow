import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthProvider';
import { useOrg } from '@/hooks/useOrg';
import { LoginDialog } from '@/components/auth/LoginDialog';
import { User, LogOut, Building, Settings, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const { userOrgs, currentOrgId } = useOrg();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const navigate = useNavigate();

  const currentOrg = userOrgs.find(org => org.org_id === currentOrgId);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out"
      });
      navigate('/');
    }
  };

  const getInitials = (email: string) => {
    return email.slice(0, 2).toUpperCase();
  };

  if (!user) {
    return (
      <>
        <Button 
          variant="outline" 
          onClick={() => setShowLoginDialog(true)}
          className="text-foreground border-border hover:bg-accent"
        >
          Login
        </Button>
        <LoginDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
          onSuccess={() => navigate('/dashboard')}
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user.email || 'U')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.email}</p>
            {currentOrg && (
              <p className="text-xs leading-none text-muted-foreground">
                {currentOrg.role} in Current Org
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          <User className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        {userOrgs.length > 1 && (
          <DropdownMenuItem onClick={() => navigate('/switch-org')}>
            <Building className="mr-2 h-4 w-4" />
            <span>Switch Org...</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => navigate('/account/devices')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Devices</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/security')}>
          <Shield className="mr-2 h-4 w-4" />
          <span>Security</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};