import { useEffect } from "react";

import { usePlayerStore } from "../store/playerStore.js";

export function User() {
  const currentUser = usePlayerStore((state) => state.currentUser);
  const setCurrentUser = usePlayerStore((state) => state.setCurrentUser);

  useEffect(() => {
    const token = localStorage.getItem("spotify_token");
    if (!token) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        const profile = {
          id: user.id,
          name: user.display_name,
          email: user.email,
          country: user.country,
          image: user.images?.[0]?.url || null,
        };
        setCurrentUser(profile);
      })
      .catch((err) => console.error("Error loading Spotify user:", err));
  }, [setCurrentUser]);


    
  return (
    <div>
    </div>
  )
}