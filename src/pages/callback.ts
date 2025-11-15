// src/pages/callback.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, redirect }) => {
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("No code provided", { status: 400 });
  }

  const client_id = "085367c31dee459bafba7b2c3400df48";
  const client_secret = "8932663c1d7f460f97893939f846243b";
  const redirect_uri = "http://127.0.0.1:4321/callback";

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri,
    client_id,
    client_secret,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await res.json();

  if (data.access_token) {
    // Aquí puedes guardar el token en una cookie, redirigir, etc.
    return redirect(`/success?token=${data.access_token}`);
  }

  return new Response("Error getting token", { status: 500 });
};