import { usePlayerStore } from "@/store/playerStore";
import {CurrentSong } from "./CurrentSong";

export function ViewDetails() {
  const viewDetails = usePlayerStore(state => state.viewDetails);


  return (
    <aside className="[grid-area_view] flex-col flex overflow-y-auto"
      style={{
        width: viewDetails ? "350px" : "0px",
        minWidth: viewDetails ? "350px" : "0px",
        opacity: viewDetails ? 1 : 0,
        transition: "all 0.3s ease",
      }}>
      {viewDetails && <CurrentSong />}
    </aside>
  );


}