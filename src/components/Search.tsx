import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Song, Artist, Playlist } from '../types/music';

// Mock data for demonstration
const mockData = {
  songs: [
    {
      id: '1',
      title: 'Warba Traditional',
      artist: 'Amadou Balaké',
      album: 'Best of Warba',
      coverUrl: 'https://images.unsplash.com/photo-1594815550232-e615b7a46f25?q=80&w=150&h=150&auto=format&fit=crop',
      duration: 245,
    },
    {
      id: '2',
      title: 'Burkina Faso',
      artist: 'Floby',
      album: 'Modern Classics',
      coverUrl: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?q=80&w=150&h=150&auto=format&fit=crop',
      duration: 198,
    },
  ],
  artists: [
    {
      id: '1',
      name: 'Floby',
      imageUrl: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?q=80&w=150&h=150&auto=format&fit=crop',
      genres: ['Folk', 'Mandé'],
    },
    {
      id: '2',
      name: 'Kady Diarra',
      imageUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=150&h=150&auto=format&fit=crop',
      genres: ['Modern Folk', 'Acoustic'],
    },
  ],
  playlists: [
    {
      id: '1',
      name: 'Best of Burkina',
      description: 'Top tracks from Burkina Faso',
      coverUrl: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?q=80&w=150&h=150&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'Traditional Hits',
      description: 'Classic traditional music',
      coverUrl: 'https://images.unsplash.com/photo-1594815550232-e615b7a46f25?q=80&w=150&h=150&auto=format&fit=crop',
    },
  ],
};

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    songs: [] as Song[],
    artists: [] as Artist[],
    playlists: [] as Playlist[],
  });

  useEffect(() => {
    if (query.length > 0) {
      // Simulate API search
      const filteredSongs = mockData.songs.filter(
        song => 
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase())
      );
      
      const filteredArtists = mockData.artists.filter(
        artist => artist.name.toLowerCase().includes(query.toLowerCase())
      );
      
      const filteredPlaylists = mockData.playlists.filter(
        playlist => playlist.name.toLowerCase().includes(query.toLowerCase())
      );

      setResults({
        songs: filteredSongs,
        artists: filteredArtists,
        playlists: filteredPlaylists,
      });
    } else {
      setResults({ songs: [], artists: [], playlists: [] });
    }
  }, [query]);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-8">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search for songs, artists, or playlists..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zinc-900 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {query && (
          <div className="space-y-8">
            {/* Songs */}
            {results.songs.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4">Songs</h2>
                <div className="space-y-2">
                  {results.songs.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center gap-4 p-2 hover:bg-zinc-900 rounded-lg cursor-pointer group"
                    >
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-12 h-12 rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{song.title}</h3>
                        <p className="text-sm text-zinc-400">{song.artist}</p>
                      </div>
                      <span className="text-sm text-zinc-400">
                        {formatDuration(song.duration)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Artists */}
            {results.artists.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4">Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {results.artists.map((artist) => (
                    <div
                      key={artist.id}
                      className="p-4 bg-zinc-900/50 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-full aspect-square object-cover rounded-full mb-3"
                      />
                      <h3 className="font-medium text-center">{artist.name}</h3>
                      <p className="text-sm text-zinc-400 text-center">
                        {artist.genres.join(' • ')}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Playlists */}
            {results.playlists.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4">Playlists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {results.playlists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="p-4 bg-zinc-900/50 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      <img
                        src={playlist.coverUrl}
                        alt={playlist.name}
                        className="w-full aspect-square object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-medium">{playlist.name}</h3>
                      <p className="text-sm text-zinc-400">{playlist.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No results */}
            {query.length > 0 &&
              results.songs.length === 0 &&
              results.artists.length === 0 &&
              results.playlists.length === 0 && (
                <div className="text-center text-zinc-400 py-8">
                  No results found for "{query}"
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}