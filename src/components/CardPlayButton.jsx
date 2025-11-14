import { set } from "astro:schema";
import {Pause, Play} from "./Player.jsx"

import { usePlayerStore } from "@/store/playerStore.js"


export function CardPlayButton({id}) {
    const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)

    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id; 

    const  handleClick = () => {
        if(isPlayingPlaylist){
            setIsPlaying(false)
            return
        }

        setCurrentMusic({
            playlist:{
                id
            }
        })

        fetch(`/api/get-info-playlist.json?id=${id}`)
            .then(res => res.json())
            .then(data =>{
                const { songs, playlist} = data;
                setIsPlaying(true);
                setCurrentMusic({
                    songs,
                    playlist,
                    song: songs[0]
                })

            })
    }   


    return(
        <button onClick={handleClick} className="Card-play-button rounded-full bg-green-500 p-4 cursor-pointer">
           {
            isPlayingPlaylist ? <Pause/> : <Play/>
           } 
        </button>
    )
}