import { usePlayerStore } from "@/store/playerStore";
import { useState, useEffect, useRef } from "react";
import { ViewSong } from "@/icons/LeftOptions";

export function CurrentSong () {

  const currentMusic = usePlayerStore(state => state.currentMusic);
  const [songData, setSongData] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const videoRef = useRef(null);


  useEffect(() => {
    // Actualizar los datos de la canción cuando currentMusic cambie
    if (currentMusic?.song) {
      setSongData(currentMusic.song);

      // Verificar si el archivo es MP4
      const songId = currentMusic.song.id;
      const playlistId = currentMusic.playlist?.id;

      if (songId && playlistId) {
        const srcMp4 = `/music/${playlistId}/0${songId}.mp4`;

        // Verificar si el archivo MP4 existe
        checkFileExists(srcMp4).then(exists => {
          setIsVideo(exists);
        });
      } else {
        setIsVideo(false)
      }

    }
  }, [currentMusic]);


  // Función para verificar si un archivo existe
  const checkFileExists = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  };


  // Efecto para controlar el video
  useEffect(() => {
    if (videoRef.current && isVideo && songData) {
      const video = videoRef.current;
      const playlistId = currentMusic.playlist?.id;
      const srcMp4 = `/music/${playlistId}/0${songData.id}.mp4`;

      console.log("Setting up video:", srcMp4);

      video.src = srcMp4;
      video.loop = false;
      video.muted = true;
      video.playsInline = true;

      const handleLoadedMetadata = () => {
        console.log("Video duration:", video.duration);

        const totalDuration = video.duration;
        const clipDuration = 3;

        // Elegir un punto aleatorio entre el 30% y 70% del video
        const minStart = totalDuration * 0.3;
        const maxStart = totalDuration * 0.7 - clipDuration;

        const startTime = Math.max(0, minStart + Math.random() * (maxStart - minStart));
        const adjustedStartTime = Math.min(startTime, totalDuration - clipDuration);

        console.log(`Playing ${clipDuration}s clip from ${adjustedStartTime.toFixed(1)}s`);

        video.currentTime = adjustedStartTime;
        video.play().catch(console.error);

        video.ontimeupdate = () => {
          if (video.currentTime >= adjustedStartTime + clipDuration) {
            video.currentTime = adjustedStartTime;
          }
        };
      };

      video.onloadedmetadata = handleLoadedMetadata;

      return () => {
        if (video) {
          video.ontimeupdate = null;
        }
      };
    }
  }, [isVideo, songData, currentMusic]);

  if (!songData) {
    return (
      <div className="rounded-lg bg-zinc-900 overflow-y-auto w-80 h-full flex items-center justify-center">
        <p className="text-gray-400">Selecciona una canción</p>
      </div>
    );
  }
  console.log(songData);

  return (
    <div className="rounded-lg bg-zinc-900 overflow-y-auto flex flex-col h-full">
      {/* Header con gradiente */}
      <div className="relative h-93 w-full overflow-hidden rounded-t-lg">
        {isVideo ? (
          // Video con fade out
          <div className="relative h-full w-full">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
            />
            <div class="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/80"></div>
          </div>
        ) : (
          // Imagen estilo cover
          <div className="relative h-full w-full bg-zinc-900 flex items-center justify-center">
            <picture className="aspect-square w-70 flex-none">
              <img
                src={songData.image}
                alt={songData.title}
                className="object-cover w-full h-full rounded-md"
              />
            </picture>


          </div>
        )}

        {/* Overlay de información en la parte superior */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <p className="text-white font-semibold text-sm mb-2">
            {songData.album || "Álbum"}
          </p>
        </div>

      </div>

      <button className="flex items-center gap-2 px-4 py-1 ml-3 bg-zinc-700 hover:bg-zinc-800 text-white text-xs rounded-md shadow transition duration-200 w-36">
        <ViewSong />    
        <span>Cambiar a video</span>
      </button>

      {/* Contenido de la canción */}
      <div className="flex-1 p-4 bg-zinc-900">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white">{songData.title}</h2>
          <p className="text-gray-400 text-sm">
            {songData.artists?.join(', ')}
          </p>

          {songData.duration && (
            <div className="mt-4">
              <p className="text-gray-500 text-xs">Duración: {songData.duration}</p>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};