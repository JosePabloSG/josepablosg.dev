export interface SpotifyTrack {
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

export interface SpotifyApi {
    is_playing: boolean;
    currently_playing_type?: string;
    item?: SpotifyTrack;
    items?: Array<{ track: SpotifyTrack }>;
}

export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
export const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN ?? '';
export const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
export const SPOTIFY_NOW_PLAYING_URL =
    'https://api.spotify.com/v1/me/player/currently-playing';
export const SPOTIFY_RECENTLY_PLAYED_URL =
    'https://api.spotify.com/v1/me/player/recently-played?limit=1';

class TokenManager {
    private static instance: TokenManager;
    private tokenCache: { token: string; expiryTime: number } | null = null;
    private prefetchPromise: Promise<void> | null = null;

    private constructor() {}

    public static getInstance(): TokenManager {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }

    private getBasicToken(): string {
        return Buffer.from(
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString('base64');
    }

    public async prefetchToken() {
        if (
            !this.prefetchPromise &&
            (!this.tokenCache || Date.now() >= this.tokenCache.expiryTime)
        ) {
            this.prefetchPromise = this.getAccessToken()
                .then(() => void 0)
                .catch((error) => console.error('Token prefetch error:', error))
                .finally(() => (this.prefetchPromise = null));
        }
        return this.prefetchPromise;
    }

    public async getAccessToken(): Promise<string> {
        if (this.tokenCache && Date.now() < this.tokenCache.expiryTime) {
            return this.tokenCache.token;
        }

        const response = await fetch(SPOTIFY_TOKEN_URL, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${this.getBasicToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: SPOTIFY_REFRESH_TOKEN,
            }).toString(),
        });

        const data = await response.json();

        this.tokenCache = {
            token: data.access_token,
            expiryTime: Date.now() + (data.expires_in * 1000 - 5000),
        };

        if (!this.tokenCache.token)
            throw new Error('Failed to get access token');
        return this.tokenCache.token;
    }
}

export const fetchWithTimeout = async (
    url: string,
    options: RequestInit,
    timeout: number,
    retries = 3
): Promise<Response> => {
    const controller = new AbortController();

    for (let i = 0; i < retries; i++) {
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (i < retries - 1) {
                const delay = 500 * Math.pow(2, i);
                await new Promise((resolve) => setTimeout(resolve, delay));
                continue;
            }
            throw error;
        }
    }
    throw new Error('All retries failed');
};

export const formatResponse = (data: SpotifyApi) => {
    const track = data.item ?? data.items?.[0]?.track;

    return {
        isPlaying: data.is_playing || false,
        title: track?.name || 'Not Available',
        album: track?.album.name || 'No Album',
        artist:
            track?.album.artists.map((artist) => artist.name).join(', ') ||
            'No Artist',
        albumImageUrl: track?.album.images[0]?.url || null,
        songUrl: track?.external_urls.spotify || 'https://open.spotify.com',
    };
};

export const tokenManager = TokenManager.getInstance();
tokenManager.prefetchToken().catch(() => {});
