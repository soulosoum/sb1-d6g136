import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { songs } from '../data/songs';

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function SongList() {
  const navigate = useNavigate();
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();

  const handlePlayClick = (songId: string) => {
    const song = songs.find(s => s.id === songId);
    if (!song) return;

    if (currentSong?.id === songId) {
      togglePlay();
    } else {
      setCurrentSong(song);
      navigate(`/playing/${songId}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Popular Songs</h2>
      <div className="bg-zinc-900/50 rounded-lg overflow-hidden">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="group flex items-center gap-4 p-4 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800 last:border-none"
          >
            <div className="w-8 text-center text-zinc-400 group-hover:hidden">
              {index + 1}
            </div>
            <button
              onClick={() => handlePlayClick(song.id)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500 hidden group-hover:flex hover:scale-105 transition-transform"
            >
              {currentSong?.id === song.id && isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </button>
            <img
              src={song.coverUrl}
              alt={song.title}
              className="w-12 h-12 rounded"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{song.title}</h3>
              <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </div>
            <div className="text-sm text-zinc-400">{song.album}</div>
            <div className="text-sm text-zinc-400 w-16 text-right">
              {formatDuration(song.duration)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}