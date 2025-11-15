import { useEffect, useState } from "react";
import { CardPlayButton } from "@/components/CardPlayButton.jsx";

export function PlaylistToApi() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("spotify_token");
    if (!token) return;

    async function fetchPlaylists() {
      try {
        const res = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Error fetching playlists", res.status);
          return;
        }

        const data = await res.json();
        setPlaylists(data.items || []);
        console.log("Playlists fetched:", data.items);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center py-8">
        Cargando playlists...
      </div>
    );
  }

  return (
    
      

      <div className="flex mt-6 gap-4 overflow-y-hidden ">

        
        {playlists.map((pl) => {
          const cover = pl.images?.[0]?.url || "";
          const title = pl.name;
          const artistsString = pl.owner?.display_name || "Desconocido";

          return (
            <article
              key={pl.id}
              className="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md transition-all duration-300"
            >
              <div
                className="absolute right-4 bottom-20 translate-y-4
                  transition-all duration-500 opacity-0
                  group-hover:translate-y-0 group-hover:opacity-100
                  z-10"
              >
                <CardPlayButton id={pl.id} />
              </div>

              <a
                href={`/playlist/${pl.id}`}
                className="playlist-item flex relative p-2 overflow-hidden 
                items-center gap-2 pb-6
                transition-all duration-300 w-40 flex-col"
              >
                <picture className="aspect-square w-full h-auto flex-none">
                  <img
                    src={cover}
                    alt={`Cover of ${title}`}
                    className="object-cover w-full h-full rounded-md"
                  />
                </picture>

                <div className="flex flex-auto flex-col truncate px-2">
                  <h4 className="text-white text-ms truncate">
                    {title}
                  </h4>

                  <span className="text-zinc-400 text-xs truncate">
                    {artistsString}
                  </span>
                </div>
              </a>
            </article>
          );
        })}
      </div>
    
  );
}
