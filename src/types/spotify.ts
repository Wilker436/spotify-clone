export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  name: string;
  id: string;
  images?: SpotifyImage[];
}

export interface SpotifyAlbum {
  name: string;
  images: SpotifyImage[];
  artists: SpotifyArtist[];
}

export interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
}

export interface SpotifyPlaylist {
  name: string;
  id: string;
  images: SpotifyImage[];
  description?: string;
  owner: {
    display_name: string;
  };
}

export interface LibraryItem {
  track: SpotifyTrack;
}

export interface PlaylistResponse {
  items: SpotifyPlaylist[];
}

export interface FollowedArtistsResponse {
  artists: {
    items: SpotifyArtist[];
  };
}

export interface SavedTracksResponse {
  items: LibraryItem[];
}

export interface SavedAlbumsResponse {
  items: {
    album: SpotifyAlbum;
  }[];
}