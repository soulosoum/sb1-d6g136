import React from 'react';

const featuredArtists = [
  {
    id: '1',
    name: 'Floby',
    imageUrl: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?q=80&w=300&h=300&auto=format&fit=crop',
    genres: ['Folk', 'Mandé'],
  },
  {
    id: '2',
    name: 'Amadou Balaké',
    imageUrl: 'https://images.unsplash.com/photo-1594815550232-e615b7a46f25?q=80&w=300&h=300&auto=format&fit=crop',
    genres: ['Traditional', 'Warba'],
  },
  {
    id: '3',
    name: 'Kady Diarra',
    imageUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=300&h=300&auto=format&fit=crop',
    genres: ['Modern Folk', 'Acoustic'],
  },
];

export default function FeaturedArtists() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Featured Artists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {featuredArtists.map((artist) => (
          <div 
            key={artist.id}
            className="bg-zinc-900/50 p-4 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <img 
              src={artist.imageUrl} 
              alt={artist.name}
              className="w-full aspect-square object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-lg">{artist.name}</h3>
            <p className="text-sm text-zinc-400">{artist.genres.join(' • ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}