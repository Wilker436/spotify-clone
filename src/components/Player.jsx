import { usePlayerStore } from "@/store/playerStore";
import { useRef, useEffect, useState } from "react"
import { Slider } from "./Slider"
import { SoundHigh, SoundMute, SoundLow, SoundMedium } from "@/icons/sound";
import { Conect, Tail, Lyric, ViewSong } from "@/icons/LeftOptions";
import { Next, Back, Pause, Play } from "./PlayerIcons"



const CurrentSong = ({ image, title, artists }) => {
    return (
        <div className="flex items-center gap-5 relative overflow-hidden">
            <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title} className="h-full  " />
            </picture>

            <div className="flex flex-col">
                <h3 className="font-semibold text-sm block">{title}</h3>
                <span className="text-xs opacity-80">{artists?.join(',')}</span>
            </div>
        </div>
    )
}

const SongControl = ({ audio }) => {
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        const handler = () => setCurrentTime(audio.current.currentTime);

        audio.current.addEventListener('timeupdate', handler)

        return () => audio.current.removeEventListener('timeupdate', handler)
    }, [])

    const formatTime = time => {
        if (time == null) return `0:00`
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const duration = audio?.current?.duration ?? 0;

    return (
        <div className="flex gap-x-3 text-xs pt-2">
            <span className="opacity-50 w-12 text-right">{formatTime(currentTime)}</span>

            <Slider
                defaultValue={[0]}
                value={[currentTime]}
                max={duration}
                min={0}
                className="w-[400px]"
                onValueChange={([newTime]) => audio.current.currentTime = newTime}
            />

            <span className="opacity-50 w-12">{duration ? formatTime(duration) : null}</span>
        </div>
    )
}

const VolumenControl = () => {
    const setVolume = usePlayerStore(state => state.setVolume)
    const volume = usePlayerStore(state => state.volume)
    const previousVolumeRef = useRef(volume)

    const setViewDetails = usePlayerStore(state => state.setViewDetails);
    const viewDetails = usePlayerStore(state => state.viewDetails);

    const viewQueue = usePlayerStore(state => state.viewQueue);
    const setViewQueue = usePlayerStore(state => state.setViewQueue);

    const isMuted = volume < 0.1
    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);

    const toggleVolume = () => {
        if (isMuted) {
            setVolume(previousVolumeRef.current)
        } else {
            previousVolumeRef.current = volume
            setVolume(0)
        }
    }

    const toggleViewDetails = () => {
        // Si ya está activo, lo desactiva
        if (viewDetails) {
            setViewDetails(false)
        } else {
            // Activa viewDetails y desactiva viewQueue
            setViewDetails(true)
            setViewQueue(false)
        }
    }

    const toggleViewQueue = () => {
        // Si ya está activo, lo desactiva
        if (viewQueue) {
            setViewQueue(false)
        } else {
            // Activa viewQueue y desactiva viewDetails
            setViewQueue(true)
            setViewDetails(false)
        }
    }

    return (
        <div className="flex justify-center gap-x-3 text-gray-400">

            <button
                onClick={toggleViewDetails}
                className={`relative transition-transform duration-200 cursor-pointer ${viewDetails ? "text-[#05df72]" : "text-gray-400 hover:text-gray-300 hover:scale-[1.1]"
                    }`}
            >
                <ViewSong />
                {viewDetails && (
                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 h-1.5 w-1.5 rounded-full bg-[#05df72] transition" />
                )}
            </button>

            <Lyric />

            <button
                onClick={toggleViewQueue}
                className={`relative transition-transform duration-200 cursor-pointer ${viewQueue ? "text-[#05df72]" : "text-gray-400 hover:text-gray-300 hover:scale-[1.1]"
                    }`}
            >
                <Tail />
                {viewQueue && (
                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 h-1.5 w-1.5 rounded-full bg-[#05df72] transition" />
                )}
            </button>


            <Conect />

            <button className="hover:text-[#05df72]" onClick={toggleVolume}>
                {isMuted && <SoundMute />}
                {!isMuted && volume < 0.5 && <SoundLow />}
                {volume >= 0.5 && volume < 0.75 && <SoundMedium />}
                {volume >= 0.75 && <SoundHigh />}
            </button>

            <Slider
                defaultValue={[100]}
                max={100}
                min={0}
                value={[volume * 100]}
                className="w-[95px]"
                onValueChange={([v]) => setVolume(v / 100)}
            />
        </div>
    )
}

export function Player() {
    const { isPlaying, setIsPlaying, currentMusic, volume, playNextSong, playPrevSong } = usePlayerStore(state => state);


    const audioRef = useRef();

    // ▶️ play / pause
    useEffect(() => {
        if (isPlaying) audioRef.current.play();
        else audioRef.current.pause();
    }, [isPlaying]);

    // 🔊 volume
    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    // 🎵 cuando cambia la canción
    useEffect(() => {
        const { song, playlist } = currentMusic;
        if (!song) return;

        const srcMp4 = `/music/${playlist?.id}/0${song.id}.mp4`;
        const srcMp3 = `/music/${playlist?.id}/0${song.id}.mp3`;

        const tester = new Audio();

        tester.src = srcMp4;

        tester.oncanplay = () => {
            audioRef.current.src = srcMp4;
            audioRef.current.volume = volume;
            audioRef.current.play();
        };

        tester.onerror = () => {
            audioRef.current.src = srcMp3;
            audioRef.current.volume = volume;
            audioRef.current.play();
        };

        tester.load();
    }, [currentMusic]);

    // ⭐ CUANDO TERMINA LA CANCIÓN → siguiente
    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener("ended", playNextSong);

        return () => audio.removeEventListener("ended", playNextSong);
    }, [playNextSong]);

    return (
        <div className="flex flex-row justify-between w-full px-1 z-50">

            <div className="w-[200px]">
                <CurrentSong {...currentMusic.song} />
            </div>

            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex justify-center flex-col items-center ">
                    <div className="flex gap-5 justify-center items-center">
                        <button onClick={playPrevSong} className="cursor-pointer">
                            <Back />
                        </button>
                        <button
                            className="bg-white rounded-full p-2 cursor-pointer"
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            {isPlaying ? <Pause /> : <Play />}
                        </button>
                        <button onClick={playNextSong} className="cursor-pointer">
                            <Next />
                        </button>
                    </div>


                    <SongControl audio={audioRef} />
                    <audio ref={audioRef}></audio>
                </div>
            </div>

            <div className="grid place-content-center">
                <VolumenControl />
            </div>

        </div>
    )
}
