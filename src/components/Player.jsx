import { usePlayerStore } from "@/store/playerStore";
import { useRef, useEffect, useState } from "react"
import { Slider } from "./Slider"
import { SoundHigh, SoundMute, SoundLow, SoundMedium } from "@/icons/sound";
import { Conect, Tail, Lyric, ViewSong } from "@/icons/LeftOptions";
import { set } from "astro:schema";


export const Play = () => (
    <svg
        height="16"
        width="16"
        role="img"
        aria-hidden="true"
        viewBox="0 0 16 16"
    ><path
        d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"
    ></path></svg>

)


export const Pause = () => (
    <svg
        role="img"
        height="16"
        width="16"
        aria-hidden="true"
        viewBox="0 0 16 16"
    ><path
        d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z">
        </path></svg>
)



const CurrentSong = ({ image, title, artists }) => {
    return (
        <div className={`flex items-center gap-5 relative
            overflow-hidden
        `} >
            <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title} className="h-full" />
            </picture>

            <div className="flex flex-col">
                <h3 className="font-semibold text-sm block ">
                    {title}
                </h3>

                <span className="text-xs opacity-80">
                    {artists?.join(',')}
                </span>
            </div>



        </div>
    )
}

const VolumenControl = () => {
    const setVolume = usePlayerStore(state => state.setVolume)
    const volume = usePlayerStore(state => state.volume)
    const previousVolumeRef = useRef(volume)

    const isVolumenSilenced = volume < 0.1


    const handleClickVolume = () => {
        if (isVolumenSilenced) {
            setVolume(previousVolumeRef.current)
        } else {
            previousVolumeRef.current = volume
            setVolume(0)
        }

    }



    return (
        <div className="flex justify-center gap-x-3 text-gray-400">
            <ViewSong />
            <Lyric />
            <Tail />
            <Conect />

            <button className="hover:text-[#05df72] transition" onClick={handleClickVolume}>
                {volume < 0.1 && <SoundMute />}
                {volume >= 0.1 && volume < 0.5 && <SoundLow />}
                {volume >= 0.5 && volume < 0.75 && <SoundMedium />}
                {volume >= 0.75 && <SoundHigh />}
            </button>

            <Slider
                defaultValue={[100]}
                max={100}
                min={0}
                value={[volume * 100]}
                className="w-[95px]"
                onValueChange={(value) => {
                    const [newVolume] = value
                    const volumeValue = newVolume / 100
                    setVolume(volumeValue)
                }}
            />
        </div>

    )

}

export function Player() {
    const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(state => state);
    const audioRef = useRef();


    useEffect(() => {
        isPlaying
            ? audioRef.current.play()
            : audioRef.current.pause()
    }, [isPlaying])

    useEffect(() => {
        audioRef.current.volume = volume
    }, [volume])


    useEffect(() => {
        const { song, playlist, songs } = currentMusic
        if (song) {
            const srcMp4 = `/music/${playlist?.id}/0${song.id}.mp4`
            const srcMp3 = `/music/${playlist?.id}/0${song.id}.mp3`

            const audioTest = new Audio();

            audioTest.src = srcMp4;
            audioTest.oncanplay = () => {
                console.log("Archivo MP4 encontrado:", srcMp4);
                audioRef.current.src = srcMp4;
                audioRef.current.volume = volume
                audioRef.current.play();
            };

            audioTest.onerror = () => {
                console.log("MP4 no encontrado, intentando con MP3:", srcMp3);
                // Si el MP4 falla, intentar con MP3
                audioRef.current.src = srcMp3;
                audioRef.current.volume = volume
                audioRef.current.play();
            };

            // Iniciar la verificación
            audioTest.load();
        }
    }, [currentMusic]);

    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="flex flex-row justify-between w-full  px-4 z-50">

            <div>
                <CurrentSong {...currentMusic.song} />
            </div>

            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex justify-center ">
                    <button
                        className="bg-white rounded-full p-2 cursor-pointer"
                        onClick={handleClick}>
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>

            <div className="grid place-content-center">
                <VolumenControl />

            </div>

            <audio ref={audioRef}></audio>

        </div>
    )
}