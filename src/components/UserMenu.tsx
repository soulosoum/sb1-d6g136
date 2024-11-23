import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import AuthModal from './AuthModal';

export default function UserMenu() {
  const { user, signOut } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) {
    return (
      <>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-2 hover:text-emerald-500 transition-colors"
        >
          <User className="w-5 h-5" />
          <span>Sign In</span>
        </button>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 hover:text-emerald-500 transition-colors"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.email || ''}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <User className="w-5 h-5" />
        )}
        <span>{user.email}</span>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-md shadow-lg py-1">
          <button
            onClick={() => {
              signOut();
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-zinc-800 w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}