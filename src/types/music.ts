export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: Song[];
  createdBy: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
  genres: string[];
  monthlyListeners: number;
}