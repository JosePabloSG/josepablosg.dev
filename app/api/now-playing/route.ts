import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import {
    SpotifyApi,
    SPOTIFY_NOW_PLAYING_URL,
    SPOTIFY_RECENTLY_PLAYED_URL,
    tokenManager,
    fetchWithTimeout,
    formatResponse,
} from '@config/route.config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const API_TIMEOUT = 2000;
const CACHE_DURATION = 30000;
const responseCache = new Map<
    string,
    { data: SpotifyApi; timestamp: number }
>();
let prefetchInitiated = false;

async function safeJsonParse<T>(response: Response): Promise<T | null> {
    try {
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    } catch (error) {
        return null;
    }
}

async function fetchSpotifyData(
    url: string,
    accessToken: string
): Promise<SpotifyApi | null> {
    try {
        const response = await fetchWithTimeout(
            url,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Cache-Control': 'no-cache',
                },
                next: { revalidate: 30 },
            },
            API_TIMEOUT
        );

        return response.ok ? await safeJsonParse<SpotifyApi>(response) : null;
    } catch (error) {
        return null;
    }
}

async function getSpotifyData(): Promise<SpotifyApi> {
    const headersList = await headers();
    const cacheKey = headersList.get('x-spotify-cache-key') || 'default';

    if (!prefetchInitiated) {
        prefetchInitiated = true;
        await tokenManager.prefetchToken().catch(() => {});
    }

    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    try {
        const accessToken = await tokenManager.getAccessToken();
        const [nowPlaying, recentlyPlayed] = await Promise.all([
            fetchSpotifyData(SPOTIFY_NOW_PLAYING_URL, accessToken),
            fetchSpotifyData(SPOTIFY_RECENTLY_PLAYED_URL, accessToken),
        ]);

        const result = nowPlaying?.is_playing ? nowPlaying : recentlyPlayed;
        if (result) {
            responseCache.set(cacheKey, {
                data: result,
                timestamp: Date.now(),
            });
            return result;
        }
    } catch (error) {
        console.error('Spotify API Error:', error);
    }

    return cached?.data || ({ is_playing: false } as SpotifyApi);
}

export const config = {
    runtime: 'edge',
};

export async function GET() {
    try {
        const data = await getSpotifyData();
        return NextResponse.json(formatResponse(data), {
            headers: {
                'Cache-Control':
                    'public, s-maxage=60, stale-while-revalidate=30',
                'CDN-Cache-Control': 'public, s-maxage=3600',
                'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
            },
        });
    } catch (error) {
        return NextResponse.json(
            formatResponse({ is_playing: false } as SpotifyApi),
            { status: 200, headers: { 'Cache-Control': 'public, s-maxage=10' } }
        );
    }
}
