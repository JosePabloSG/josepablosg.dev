"use client"

import { FaSpotify } from "react-icons/fa6"
import useSWR from "swr"
import Card from "../ui/card"
import Image from "next/image"

interface Spotify {
    isPlaying: boolean
    title: string
    album: string
    artist: string
    albumImageUrl: string
    songUrl: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const NowPlayingLoading = () => (
    <div className="flex flex-col gap-2 animate-pulse">
        <div className="h-4 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="h-6 w-48 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="h-4 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
    </div>
)

function NowPlaying() {
    const { data, isLoading } = useSWR<Spotify>(
        '/api/now-playing',
        fetcher,
        {
            refreshInterval: 30000,
            revalidateOnFocus: false,
            fallbackData: {
                isPlaying: false,
                title: 'Loading...',
                album: '',
                artist: 'No Artist',
                albumImageUrl: '',
                songUrl: '#'
            }
        }
    )

    if (isLoading) return <NowPlayingLoading />

    return (
        <div className="space-y-1">
            <div className="flex items-center gap-3">
                {data?.isPlaying && (
                    <div className="inline-flex items-center justify-center gap-1">
                        <div className="w-1 animate-[playing_0.85s_ease_infinite] rounded-full bg-[#1DB954]" />
                        <div className="w-1 animate-[playing_1.26s_ease_infinite] rounded-full bg-[#1DB954]" />
                        <div className="w-1 animate-[playing_0.62s_ease_infinite] rounded-full bg-[#1DB954]" />
                    </div>
                )}
                <p className="text-sm text-white dark:text-gray-200">
                    {data?.isPlaying ? "Now Playing" : "Offline. Last Played"}
                </p>
            </div>
            <h2
                className="line-clamp-3 font-calistoga text-2xl md:line-clamp-1 lg:line-clamp-3 text-white dark:text-gray-100"
                title={data?.title}
            >
                <a
                    href={data?.songUrl ?? "#"}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="cancel-drag hover:underline"
                >
                    {data?.title}
                </a>
            </h2>
            <p className="truncate font-medium text-white dark:text-gray-200" title={data?.artist}>
                {data?.artist}
            </p>
        </div>
    )
}

export default function Spotify() {
    const { data } = useSWR<Spotify>('/api/now-playing', fetcher, {
        revalidateIfStale: false
    })

    return (
        <Card className="relative h-full overflow-hidden transition-opacity duration-300">
            {data?.albumImageUrl && (
                <Image
                    src={data.albumImageUrl}
                    alt={data.album}
                    fill
                    priority
                    className="absolute inset-0 object-cover"
                    style={{ filter: 'brightness(0.5)' }}
                    sizes="(max-width: 768px) 50vw, 33vw"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent dark:from-black/90 dark:via-black/70 dark:to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-3 p-8">
                <div className="relative">
                    <FaSpotify
                        className="size-14 md:absolute md:right-0 md:top-0 md:size-10 lg:relative lg:size-14"
                        color="#1DB954"
                    />
                </div>
                <NowPlaying />
            </div>
        </Card>
    )
}