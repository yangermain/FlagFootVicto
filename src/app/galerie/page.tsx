'use client';

import { useState } from 'react';

interface Photo {
  id: number;
  title: string;
  description: string;
  date: string;
}

const photos: Photo[] = [
  {
    id: 1,
    title: 'Match 1',
    description: 'Équipe A vs Équipe B',
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Match 2',
    description: 'Équipe C vs Équipe D',
    date: '2024-01-22'
  },
  {
    id: 3,
    title: 'Match 3',
    description: 'Équipe E vs Équipe F',
    date: '2024-01-29'
  },
  {
    id: 4,
    title: 'Match 4',
    description: 'Équipe G vs Équipe H',
    date: '2024-02-05'
  },
  {
    id: 5,
    title: 'Match 5',
    description: 'Équipe A vs Équipe C',
    date: '2024-02-12'
  },
  {
    id: 6,
    title: 'Match 6',
    description: 'Équipe B vs Équipe D',
    date: '2024-02-19'
  }
];

export default function GaleriePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center text-[#1F2937]">
          Galerie Photos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl 
                       shadow-lg transition-all duration-300 hover:shadow-2xl 
                       hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Placeholder colored div instead of image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937] to-[#374151] 
                            flex items-center justify-center text-white text-opacity-80">
                <div className="text-center p-4">
                  <div className="text-2xl font-bold mb-2">{photo.title}</div>
                  <div className="text-sm opacity-80">{formatDate(photo.date)}</div>
                </div>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 
                            to-transparent opacity-0 group-hover:opacity-100 transition-opacity 
                            duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-lg font-semibold">{photo.description}</p>
                  <p className="text-white/80 text-sm">{formatDate(photo.date)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center 
                       backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-6 right-6 text-white bg-white/10 rounded-full 
                         w-12 h-12 flex items-center justify-center text-3xl
                         hover:bg-white/20 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
              aria-label="Fermer"
            >
              ×
            </button>
            <div 
              className="relative max-w-[90vw] max-h-[90vh] bg-gradient-to-br from-[#1F2937] to-[#374151] 
                        rounded-lg shadow-2xl aspect-[4/3] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center text-white p-8">
                <h2 className="text-4xl font-bold mb-4">{selectedPhoto.title}</h2>
                <p className="text-xl mb-4">{selectedPhoto.description}</p>
                <p className="text-lg opacity-80">{formatDate(selectedPhoto.date)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
