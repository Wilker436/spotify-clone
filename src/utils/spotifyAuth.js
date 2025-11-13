import axios from 'axios';
import querystring from 'querystring';

const { clientId, clientSecret, redirectUri, tokenUrl } = {
  clientId: '085367c31dee459bafba7b2c3400df48',
  clientSecret: 'c8c1d36004484bda8634a5d582805bc6',
  redirectUri: 'http://127.0.0.1:4321/callback',
  tokenUrl: 'https://accounts.spotify.com/api/token'
};

export async function getAccessToken(code) {
  try {
    const response = await axios.post(
      tokenUrl,
      querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

export async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post(
      tokenUrl,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

export async function getUserProfile(accessToken) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

export async function getUserPlaylists(accessToken, limit = 10) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user playlists:', error);
    throw error;
  }
}

export async function getFollowedArtists(accessToken, limit = 10) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/following', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        type: 'artist',
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting followed artists:', error);
    throw error;
  }
}

export async function getSavedTracks(accessToken, limit = 10) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting saved tracks:', error);
    throw error;
  }
}

export async function getSavedAlbums(accessToken, limit = 10) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/albums', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting saved albums:', error);
    throw error;
  }
}