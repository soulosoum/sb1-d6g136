import { create } from 'zustand';
import { Song } from '../types/music';

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  volume: number;
  progress: number;
  duration: number;
  audioElement: HTMLAudioElement | null;
  setCurrentSong: (song: Song) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  addToQueue: (song: Song) => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  seekTo: (time: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => {
  // Create audio element only once
  const audioElement = typeof Audio !== 'undefined' ? new Audio() : null;
  if (audioElement) {
    audioElement.volume = 1;
  }

  return {
    currentSong: null,
    isPlaying: false,
    queue: [],
    volume: 1,
    progress: 0,
    duration: 0,
    audioElement,

    setCurrentSong: (song) => {
      const { audioElement } = get();
      if (audioElement) {
        audioElement.src = song.audioUrl;
        audioElement.volume = get().volume;
        audioElement.play().catch(() => {
          set({ isPlaying: false });
        });
      }
      set({ currentSong: song, isPlaying: true });
    },

    togglePlay: () => {
      const { isPlaying, audioElement } = get();
      if (audioElement) {
        if (isPlaying) {
          audioElement.pause();
        } else {
          audioElement.play().catch(() => {
            set({ isPlaying: false });
          });
        }
        set({ isPlaying: !isPlaying });
      }
    },

    setVolume: (volume) => {
      const { audioElement } = get();
      if (audioElement) {
        audioElement.volume = volume;
      }
      set({ volume });
    },

    addToQueue: (song) => set((state) => ({ 
      queue: [...state.queue, song] 
    })),

    skipToNext: () => {
      const { queue, currentSong } = get();
      if (queue.length > 0) {
        const nextSong = queue[0];
        const newQueue = queue.slice(1);
        if (currentSong) {
          set((state) => ({
            queue: [...newQueue, state.currentSong!],
          }));
        }
        get().setCurrentSong(nextSong);
      }
    },

    skipToPrevious: () => {
      const { queue, currentSong } = get();
      if (currentSong && queue.length > 0) {
        const previousSong = queue[queue.length - 1];
        const newQueue = queue.slice(0, -1);
        set((state) => ({
          queue: [state.currentSong!, ...newQueue],
        }));
        get().setCurrentSong(previousSong);
      }
    },

    setProgress: (progress) => set({ progress }),

    setDuration: (duration) => set({ duration }),

    seekTo: (time) => {
      const { audioElement } = get();
      if (audioElement) {
        audioElement.currentTime = time;
        set({ progress: time });
      }
    },
  };
});