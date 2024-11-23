import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Library, PlusCircle, Heart, Music2 } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-black h-screen fixed left-0 top-0 text-white p-6">
      <div className="flex items-center gap-2 mb-8">
        <Music2 className="w-8 h-8 text-emerald-500" />
        <span className="text-2xl font-bold">FasoPlay</span>
      </div>
      
      <nav className="space-y-6">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-4 hover:text-emerald-500 transition-colors">
            <Home className="w-6 h-6" />
            <span>Home</span>
          </Link>
          <Link to="/search" className="flex items-center gap-4 hover:text-emerald-500 transition-colors">
            <Search className="w-6 h-6" />
            <span>Search</span>
          </Link>
          <Link to="/library" className="flex items-center gap-4 hover:text-emerald-500 transition-colors">
            <Library className="w-6 h-6" />
            <span>Your Library</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-zinc-800 space-y-3">
          <button className="flex items-center gap-4 hover:text-emerald-500 transition-colors w-full">
            <PlusCircle className="w-6 h-6" />
            <span>Create Playlist</span>
          </button>
          <Link to="/liked" className="flex items-center gap-4 hover:text-emerald-500 transition-colors">
            <Heart className="w-6 h-6" />
            <span>Liked Songs</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}