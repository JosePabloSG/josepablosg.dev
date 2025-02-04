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
    <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
            <div className="h-4 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700">
                <span className="invisible">Now Playing</span>
            </div>
        </div>
        <div className="h-6 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700">
            <span className="invisible">Song Title</span>
        </div>
        <div className="h-4 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700">
            <span className="invisible">Artist</span>
        </div>
    </div>
)

function NowPlaying() {
    const { data, isLoading, error } = useSWR<Spotify>(`/api/now-playing`, fetcher,
        {
            refreshInterval: (currentData) => currentData?.isPlaying ? 5000 : 30000,
            dedupingInterval: 5000,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            errorRetryCount: 2
        }
    )

    if (isLoading) return <NowPlayingLoading />

    if (error) return <p className="text-red-500">Failed to load</p>

    return (
        <div className="space-y-1">
            <div className="flex items-center gap-3">
                {data?.isPlaying && (
                    <div className="inline-flex items-center justify-center gap-1">
                        <div className="w-1 animate-playing rounded-full bg-[#1DB954]" />
                        <div className="w-1 animate-playing rounded-full bg-[#1DB954]" style={{ animationDuration: "1.26s" }} />
                        <div className="w-1 animate-playing rounded-full bg-[#1DB954]" style={{ animationDuration: "0.62s" }} />
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
    const { data } = useSWR<Spotify>(`/api/now-playing`, fetcher, {
        refreshInterval: (currentData) => currentData?.isPlaying ? 5000 : 30000,
        dedupingInterval: 5000,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        errorRetryCount: 2
    })

    return (
        <Card className="relative h-full overflow-hidden">
            {data?.albumImageUrl && (
                <Image
                    src={data.albumImageUrl}
                    alt={data.album}
                    fill
                    priority
                    className="absolute inset-0 object-cover"
                    style={{ filter: 'brightness(0.5)' }}
                />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent dark:from-black/90 dark:via-black/70 dark:to-transparent" />
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