import { usePlayerStore } from "@/store/playerStore";
import { CurrentSong } from "./CurrentSong";
import { Queue } from "./Queue";

export function ViewDetails() {
  const viewDetails = usePlayerStore(state => state.viewDetails);
  const viewQueue = usePlayerStore(state => state.viewQueue);

  // Determina qué componente mostrar
  const showComponent = viewDetails || viewQueue;

  return (
    <aside className="[grid-area_view] flex-col flex overflow-y-auto"
      style={{
        width: showComponent ? "350px" : "0px",
        minWidth: showComponent ? "350px" : "0px",
        opacity: showComponent ? 1 : 0,
        transition: "all 0.3s ease",
      }}>
      {viewDetails && <CurrentSong />}
      {viewQueue && <Queue />}
    </aside>
  );
}