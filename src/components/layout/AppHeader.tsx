import React, { useState } from 'react';
import { UserMenu } from '@/components/nav/UserMenu';
import NavigationOverlay from '@/components/NavigationOverlay';

interface AppHeaderProps {
  transparent?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-30 p-8 ${transparent ? '' : 'bg-background/95 backdrop-blur shadow-sm'}`}>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-foreground">
            On Time Flow
          </div>
          <div className="flex items-center gap-4">
            <UserMenu />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-lg font-medium hover:opacity-70 transition-all duration-300 text-foreground"
            >
              MENU
            </button>
          </div>
        </div>
      </header>

      <NavigationOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
};