import { refreshAccessToken } from './utils/spotifyAuth';

export const onRequest = async (context, next) => {
  const accessToken = context.cookies.get('spotify_access_token')?.value;
  const refreshToken = context.cookies.get('spotify_refresh_token')?.value;

  // Si no hay access token pero hay refresh token, intentar renovar
  if (!accessToken && refreshToken) {
    try {
      const newTokens = await refreshAccessToken(refreshToken);
      
      context.cookies.set('spotify_access_token', newTokens.access_token, {
        path: '/',
        maxAge: newTokens.expires_in,
        httpOnly: true,
        secure: true
      });

      if (newTokens.refresh_token) {
        context.cookies.set('spotify_refresh_token', newTokens.refresh_token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
          httpOnly: true,
          secure: true
        });
      }
    } catch (error) {
      console.error('Error refreshing token in middleware:', error);
      // Limpiar cookies si el refresh token es inválido
      context.cookies.delete('spotify_access_token', { path: '/' });
      context.cookies.delete('spotify_refresh_token', { path: '/' });
    }
  }

  return next();
};