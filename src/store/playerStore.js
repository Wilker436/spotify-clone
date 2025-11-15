import { create } from "zustand";

export const usePlayerStore = create((set, get) => ({

    isPlaying: false,
    currentMusic: { playlist: null, song: null, songs: [] },
    volume: 1,

    setVolume: (volume) => set({ volume }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),

    setCurrentMusic: (currentMusic) => set({ currentMusic }),

    viewDetails: false,
    setViewDetails: (viewDetails) => set({ viewDetails }),


    viewQueue: false,
    setViewQueue: (viewQueue) => set({ viewQueue }),
    

    playNextSong: () => {
        const state = get();
        const { songs, song } = state.currentMusic;

        if (!songs) return;

        const index = songs.findIndex(s => s.id === song.id);
        const next = songs[index + 1];

        if (!next) {
            // No hay más canciones → pausa
            set({ isPlaying: false });
            return;
        }

        set({
            currentMusic: {
                ...state.currentMusic,
                song: next
            },
            isPlaying: true
        });
    },

    playPrevSong: () => {
        const state = get();
        const { songs, song } = state.currentMusic;

        if (!songs) return;

        const index = songs.findIndex(s => s.id === song.id);
        const prev = songs[index - 1];

        if (!prev) {
            // Opcional: si quieres volver al inicio de la canción
            set({
                currentMusic: {
                    ...state.currentMusic,
                    song: songs[0]
                },
                isPlaying: true
            });
            return;
        }

        set({
            currentMusic: {
                ...state.currentMusic,
                song: prev
            },
            isPlaying: true
        });
    }

}));
