import { usePlayerStore } from "@/store/playerStore";

export function Queue() {
  const currentMusic = usePlayerStore(state => state.currentMusic);
  const setCurrentMusic = usePlayerStore(state => state.setCurrentMusic);
  const setIsPlaying = usePlayerStore(state => state.setIsPlaying);
  const currentSong = usePlayerStore(state => state.currentMusic.song);

  // Función para reproducir una canción específica de la cola
  const playSong = (song) => {
    setCurrentMusic({
      ...currentMusic,
      song: song
    });
    setIsPlaying(true);
  };

  return (
    <div className="rounded-lg bg-zinc-900 overflow-y-auto flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">
        <h3 className="font-bold text-lg">Cola de reproducción</h3>
        <p className="text-sm text-gray-400 mt-1">
          {currentMusic.songs?.length || 0} canciones
        </p>
      </div>

      {/* Lista de canciones */}
      <div className="flex-1 overflow-y-auto">
        {currentMusic.songs?.length > 0 ? (
          currentMusic.songs.map((song, index) => (
            <div
              key={`${song.id}-${index}`}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-zinc-800 transition-colors ${
                currentSong?.id === song.id 
                  ? 'bg-zinc-800 border-l-2 border-[#05df72]' 
                  : ''
              }`}
              onClick={() => playSong(song)}
            >
              {/* Número de canción */}
              <div className="w-6 flex justify-center">
                {currentSong?.id === song.id ? (
                  <div className="w-2 h-2 bg-[#05df72] rounded-full"></div>
                ) : (
                  <span className="text-sm text-gray-400">{index + 1}</span>
                )}
              </div>

              {/* Imagen de la canción */}
              <img 
                src={song.image} 
                alt={song.title} 
                className="w-12 h-12 rounded object-cover shrink-0"
              />

              {/* Información de la canción */}
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-medium truncate ${
                  currentSong?.id === song.id ? 'text-[#05df72]' : 'text-white'
                }`}>
                  {song.title}
                </h4>
                <p className="text-xs text-gray-400 truncate">
                  {song.artists?.join(', ')}
                </p>
              </div>

              {/* Duración (si está disponible) */}
              {song.duration && (
                <span className="text-xs text-gray-400 shrink-0">
                  {formatTime(song.duration)}
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <p>No hay canciones en la cola</p>
            <p className="text-sm">Reproduce una playlist para ver las canciones aquí</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Función auxiliar para formatear el tiempo
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}