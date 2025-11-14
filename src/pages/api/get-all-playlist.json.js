// /api/get-all-playlists.json (NUEVO ARCHIVO)
import { allPlaylists } from "@/lib/data";

export async function GET() {
    return new Response(JSON.stringify({ 
        playlists: allPlaylists 
    }), {
        headers: { "Content-type": "application/json" }
    });
}