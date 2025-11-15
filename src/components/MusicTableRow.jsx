import React from "react";
import { usePlayerStore } from "@/store/playerStore";

export default function MusicTableRow({ song, index, onPlay, playlist }) {
  // para resaltar la fila activa
  const current = usePlayerStore(state => state.currentMusic);
  const isActive =
    current?.song?.id === song.id &&
    (current?.playlist?.id === (playlist?.id ?? song.albumId));

  return (
    <>
      <tr
        onClick={onPlay}
        className={`cursor-pointer transition duration-200 ${
          isActive ? "bg-white/10" : "hover:bg-white/5"
        }`}
      >
        <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5 text-gray-300">
          {index + 1}
        </td>

        <td className="px-4 py-2 flex gap-3 items-center">
          <picture className="">
            <img
              src={song.image}
              alt={song.title}
              className="w-11 h-11 object-cover rounded-md"
            />
          </picture>

          <div className="flex flex-col">
            <h3 className="text-white text-base font-normal">{song.title}</h3>
            <span className="text-sm text-gray-300">{song.artists.join(", ")}</span>
          </div>
        </td>

        <td className="px-4 py-2 text-gray-300">{song.album}</td>

        <td className="px-4 py-2 rounded-tr-lg rounded-br-lg text-gray-300">
          {song.duration}
        </td>
      </tr>
    </>
  );
}
