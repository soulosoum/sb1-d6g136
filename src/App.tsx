import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAuthStore } from './store/authStore';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import FeaturedArtists from './components/FeaturedArtists';
import UserMenu from './components/UserMenu';
import Search from './components/Search';
import NowPlaying from './components/NowPlaying';
import SongList from './components/SongList';

function Home() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to FasoPlay</h1>
        <p className="text-zinc-400">Discover the rich musical heritage of Burkina Faso</p>
      </header>

      <FeaturedArtists />
      <SongList />
    </div>
  );
}

export default function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <div className="bg-zinc-950 text-white min-h-screen">
        <div className="fixed top-0 right-0 p-4 z-10">
          <UserMenu />
        </div>
        <Sidebar />
        <main className="ml-64 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/playing/:songId" element={<NowPlaying />} />
          </Routes>
        </main>
        <Player />
      </div>
    </Router>
  );
}