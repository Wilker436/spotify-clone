import React from "react";
import MusicTableRow from "./MusicTableRow.jsx";
import { usePlayerStore } from "@/store/playerStore";

export default function MusicTable({ songs, playlist }) {
  const setCurrentMusic = usePlayerStore(state => state.setCurrentMusic);
  const setIsPlaying = usePlayerStore(state => state.setIsPlaying);

  const playSong = (song) => {
    // Cargar toda la playlist/songs y la canción seleccionada en el store
    setCurrentMusic({
      songs,
      playlist: playlist ?? { id: song.albumId },
      song,
    });

    // empezar reproducción (o continuar si ya estaba)
    setIsPlaying(true);
  };

  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
      <thead>
        <tr className="text-zinc-400 text-sm">
          <th className="px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Titulo</th>
          <th className="px-4 py-2 font-light">Album</th>
          <th className="px-4 py-2 font-light">Duración</th>
        </tr>
      </thead>

      <tbody>
        {songs.map((song, index) => (
          <MusicTableRow
            key={song.id}
            song={song}
            index={index}
            onPlay={() => playSong(song)}
            playlist={playlist}
          />
        ))}
      </tbody>
    </table>
  );
}
