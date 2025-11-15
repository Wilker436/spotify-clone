import { set } from "astro:schema";
import { Pause, Play } from "./PlayerIcons"

import { usePlayerStore } from "@/store/playerStore.js"


export function CardPlayButton({ id, size = 'small' }) {
    const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)

    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

    const handleClick = () => {
        // si es la misma playlist → solo pausar/continuar
        if (currentMusic?.playlist?.id === id) {
            setIsPlaying(!isPlaying);
            return;
        }

        // si es una playlist nueva → cargar y reproducir desde la primera
        fetch(`/api/get-info-playlist.json?id=${id}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data;

                setCurrentMusic({
                    songs,
                    playlist,
                    song: currentMusic.song ?? songs[0] // importante
                });

                setIsPlaying(true)
            });
    };
    

    const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'

    return (
        <button onClick={handleClick} className="Card-play-button rounded-full bg-green-500 p-4 cursor-pointer hover:scale-105 transition hover:bg-green-400">
            {
                isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />
            }
        </button>
    )
}