"use client"

import { FaSpotify } from "react-icons/fa6"
import useSWR from "swr"
import Card from "../ui/card"
import Image from "next/image"

interface SpotifyTrack {
    isPlaying: boolean
    title: string
    album: string
    artist: string
    albumImageUrl: string
    songUrl: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const SpotifyTrackSkeleton = () => (
    <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
            <div className="h-4 w-24 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
        <div className="h-6 w-48 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="h-4 w-32 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700" />
    </div>
)

function SpotifyTrackInfo() {
    const { data, isLoading, error } = useSWR<SpotifyTrack>(`/api/now-playing`, fetcher, {
        refreshInterval: (currentData) => (currentData?.isPlaying ? 5000 : 30000),
        dedupingInterval: 5000,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        errorRetryCount: 2,
    })

    if (isLoading) return <SpotifyTrackSkeleton />

    if (error) return <p className="text-red-500">Failed to load track info</p>

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                {data?.isPlaying && (
                    <div className="flex items-center gap-1">
                        {[0.62, 1, 1.26].map((duration, index) => (
                            <div
                                key={index}
                                className="h-3 w-1 animate-playing rounded-full bg-[#1DB954]"
                                style={{ animationDuration: `${duration}s` }}
                            />
                        ))}
                    </div>
                )}
                <p className="text-sm font-medium text-white dark:text-gray-200">
                    {data?.isPlaying ? "Now Playing" : "Offline • Last Played"}
                </p>
            </div>
            <h2
                className="line-clamp-2 font-spicy-rice text-2xl text-white dark:text-gray-100 md:text-3xl"
                title={data?.title}
            >
                <a href={data?.songUrl ?? "#"} target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
                    {data?.title}
                </a>
            </h2>
            <p className="truncate font-medium text-white/80 dark:text-gray-300" title={data?.artist}>
                {data?.artist}
            </p>
        </div>
    )
}

export default function SpotifyNowPlaying() {
    const { data } = useSWR<SpotifyTrack>(`/api/now-playing`, fetcher, {
        refreshInterval: (currentData) => (currentData?.isPlaying ? 5000 : 30000),
        dedupingInterval: 5000,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        errorRetryCount: 2,
    })

    return (
        <Card className="relative h-full overflow-hidden">
            {data?.albumImageUrl && (
                <Image
                    src={data.albumImageUrl || "/placeholder.svg"}
                    alt={data.album}
                    fill
                    priority
                    className="absolute inset-0 object-cover transition-all duration-500 ease-in-out hover:scale-105"
                    style={{ filter: "brightness(0.4)" }}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-4 p-6 md:p-8">
                <div className="flex justify-between items-start">
                    <FaSpotify className="size-12 md:size-14 text-[#1DB954] transition-transform duration-300 ease-in-out hover:scale-105" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Spotify</span>
                </div>
                <SpotifyTrackInfo />
            </div>
        </Card>
    )
}

