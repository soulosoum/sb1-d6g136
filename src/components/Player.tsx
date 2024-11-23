import React, { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function Player() {
  const {
    currentSong,
    isPlaying,
    volume,
    progress,
    duration,
    togglePlay,
    setVolume,
    skipToNext,
    skipToPrevious,
    setProgress,
    setDuration,
    seekTo,
  } = usePlayerStore();

  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = usePlayerStore.getState().audioElement;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      skipToNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setProgress, setDuration, skipToNext]);

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const percentageClicked = clickPosition / rect.width;
    const newTime = duration * percentageClicked;
    seekTo(newTime);
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4 w-1/4">
          <img 
            src={currentSong.coverUrl} 
            alt={currentSong.title} 
            className="w-14 h-14 rounded"
          />
          <div>
            <h4 className="text-sm font-medium text-white">{currentSong.title}</h4>
            <p className="text-xs text-zinc-400">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center gap-6 mb-2">
            <button 
              onClick={skipToPrevious}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button 
              onClick={skipToNext}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full flex items-center gap-2">
            <span className="text-xs text-zinc-400 w-10 text-right">
              {formatTime(progress)}
            </span>
            <div
              ref={progressBarRef}
              className="flex-1 h-1 bg-zinc-800 rounded-full cursor-pointer relative"
              onClick={handleProgressBarClick}
            >
              <div
                className="absolute h-full bg-emerald-500 rounded-full"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>
            <span className="text-xs text-zinc-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-1/4 justify-end">
          {volume === 0 ? (
            <VolumeX className="w-5 h-5 text-zinc-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-zinc-400" />
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 accent-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}