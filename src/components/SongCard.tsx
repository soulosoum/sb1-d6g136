import React from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { Song } from '../types/music';

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
  
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <div className="group relative bg-zinc-900/50 p-4 rounded-lg hover:bg-zinc-900 transition-colors">
      <div className="relative">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-lg mb-4"
        />
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
        >
          {isCurrentSong && isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
      </div>
      <h3 className="font-medium truncate">{song.title}</h3>
      <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
    </div>
  );
}