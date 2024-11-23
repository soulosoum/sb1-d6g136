import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Heart, Share2, ListMusic } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { songs } from '../data/songs';

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function NowPlaying() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const {
    currentSong,
    isPlaying,
    togglePlay,
    progress,
    duration,
    volume,
    setVolume,
    setCurrentSong,
    skipToNext,
    skipToPrevious,
  } = usePlayerStore();

  const [showQueue, setShowQueue] = React.useState(false);

  useEffect(() => {
    if (songId && (!currentSong || currentSong.id !== songId)) {
      const song = songs.find(s => s.id === songId);
      if (song) {
        setCurrentSong(song);
      } else {
        navigate('/');
      }
    }
  }, [songId, currentSong, setCurrentSong, navigate]);

  if (!currentSong) return null;

  const currentIndex = songs.findIndex(s => s.id === currentSong.id);
  const queueSongs = songs.slice(currentIndex + 1);

  return (
    <div className="p-6 relative min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Album art and basic info */}
        <div className="space-y-6">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-full aspect-square object-cover rounded-lg shadow-2xl"
          />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{currentSong.title}</h1>
            <p className="text-xl text-zinc-400">{currentSong.artist}</p>
            <p className="text-sm text-zinc-500">
              {currentSong.album} • {currentSong.releaseYear} • {currentSong.genre}
            </p>
          </div>
        </div>

        {/* Right side - Player controls and queue */}
        <div className="space-y-8">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="h-1 bg-zinc-800 rounded-full">
              <div
                className="h-full bg-emerald-500 rounded-full relative"
                style={{ width: `${(progress / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-zinc-400">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Shuffle className="w-5 h-5" />
            </button>
            <button
              onClick={skipToPrevious}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-8 h-8" />
            </button>
            <button
              onClick={togglePlay}
              className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8" />
              )}
            </button>
            <button
              onClick={skipToNext}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-8 h-8" />
            </button>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <Repeat className="w-5 h-5" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-6">
            <button className="text-zinc-400 hover:text-emerald-500 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="text-zinc-400 hover:text-emerald-500 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowQueue(!showQueue)}
              className="text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              <ListMusic className="w-6 h-6" />
            </button>
          </div>

          {/* Queue */}
          {showQueue && (
            <div className="bg-zinc-900/90 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-4">Next in queue</h3>
              <div className="space-y-2">
                {queueSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-3 p-2 hover:bg-zinc-800 rounded-lg cursor-pointer"
                    onClick={() => {
                      setCurrentSong(song);
                      navigate(`/playing/${song.id}`);
                    }}
                  >
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-12 h-12 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{song.title}</h4>
                      <p className="text-sm text-zinc-400 truncate">
                        {song.artist}
                      </p>
                    </div>
                    <span className="text-sm text-zinc-400">
                      {formatTime(song.duration)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}