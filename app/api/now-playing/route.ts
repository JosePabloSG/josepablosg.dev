import { NextResponse } from 'next/server';
import {
    getAccessToken,
    fetchSpotifyData,
    formatTrackResponse,
    SPOTIFY_NOW_PLAYING_URL,
    SPOTIFY_RECENTLY_PLAYED_URL,
} from '@config/route.config';

export const dynamic = 'force-dynamic'; // Para evitar caché estática

export async function GET() {
    try {
        const accessToken = await getAccessToken();

        // Intentar obtener la canción actual primero
        const nowPlaying = await fetchSpotifyData(
            SPOTIFY_NOW_PLAYING_URL,
            accessToken
        );

        if (
            nowPlaying.is_playing &&
            nowPlaying.currently_playing_type === 'track'
        ) {
            return NextResponse.json(formatTrackResponse(nowPlaying));
        }

        // Fallback a última canción reproducida
        const recentlyPlayed = await fetchSpotifyData(
            SPOTIFY_RECENTLY_PLAYED_URL,
            accessToken
        );
        return NextResponse.json(formatTrackResponse(recentlyPlayed));
    } catch (error) {
        // Recuperación básica en caso de error
        const accessToken = await getAccessToken();
        const recentlyPlayed = await fetchSpotifyData(
            SPOTIFY_RECENTLY_PLAYED_URL,
            accessToken
        );
        return NextResponse.json(formatTrackResponse(recentlyPlayed));
    }
}
