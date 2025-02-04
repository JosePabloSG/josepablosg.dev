interface SpotifyTrack {
  name: string;
  album: {
      name: string;
      artists: Array<{ name: string }>;
      images: Array<{ url: string }>;
  };
  external_urls: {
      spotify: string;
  };
}

interface SpotifyApiResponse {
  is_playing: boolean;
  currently_playing_type?: string;
  item?: SpotifyTrack;
  items?: Array<{ track: SpotifyTrack }>;
}

export const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
export const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
export const SPOTIFY_RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const getBasicToken = () => Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

let cachedToken: { token: string; expiresAt: number } | null = null;

export const getAccessToken = async (): Promise<string> => {
  const now = Date.now();
  if (cachedToken && now < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
          Authorization: `Basic ${getBasicToken()}`,
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? '',
      }),
  });

  if (!response.ok) throw new Error('Failed to refresh access token');
  const { access_token, expires_in } = await response.json();

  cachedToken = {
    token: access_token,
    expiresAt: now + expires_in * 1000 - 30000
  };

  return access_token;
};

export const fetchSpotifyData = async (url: string, accessToken: string): Promise<SpotifyApiResponse> => {
  const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 1 } // Cache de 1 segundo
  });

  if (response.status === 204) return { is_playing: false }; // No content
  if (!response.ok) throw new Error(`Spotify API error: ${response.statusText}`);
  
  return response.json();
};

export const formatTrackResponse = (data: SpotifyApiResponse) => {
  const track = data.item ?? data.items?.[0]?.track;
  if (!track) throw new Error('No track data available');

  return {
      isPlaying: data.is_playing || false,
      title: track.name,
      album: track.album.name,
      artist: track.album.artists.map(artist => artist.name).join(', '),
      albumImageUrl: track.album.images[0]?.url,
      songUrl: track.external_urls.spotify,
  };
};