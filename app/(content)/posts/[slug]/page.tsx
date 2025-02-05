import { CustomMDX } from "@/components/mdx"
import Anchor from "@/components/ui/anchor"
import { siteConfig } from "@/config/site"
import { getAllPosts } from "@/lib/mdx"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import Script from "next/script"
import { FaX } from "react-icons/fa6"
import Image from "next/image"

type Params = Promise<{ slug: string }>

export const generateStaticParams = async () => getAllPosts().map((post) => ({ slug: post.slug }))

export const generateMetadata = async ({ params }: { params: Params }) => {
    const { slug } = await params

    const post = getAllPosts().find((post) => post.slug === slug)
    if (!post) return

    const { title, description, date } = post.metadata

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime: date,
            url: `${siteConfig.url}/posts/${post.slug}`,
            authors: "JosePablo",
        },
        twitter: {
            title,
            description,
        },
        alternates: {
            canonical: `${siteConfig.url}/posts/${post.slug}`,
        },
    }
}

const PostPage = async ({ params }: { params: Params }) => {
    const { slug } = await params

    const post = getAllPosts().find((post) => post.slug === slug)

    if (!post) notFound()

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.metadata.title,
        description: post.metadata.description,
        datePublished: post.metadata.date,
        author: [
            {
                "@type": "Person",
                name: "JosePablo",
                url: siteConfig.url,
            },
        ],
    }

    return (
        <div className="mx-auto max-w-prose px-4 py-10 flex flex-col min-h-screen">
            <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <header className="flex items-center justify-center pb-10">
                <Anchor className="inline-flex hover:mb-6 hover:scale-125" href="/">
                    <FaX />
                    <div className="sr-only">Close</div>
                </Anchor>
            </header>
            <section className="text-center">
                <h1 className="font-spicy-rice text-3xl leading-relaxed">{post.metadata.title}</h1>
                <small className="mt-2 text-gray-600 dark:text-gray-400">
                    <time dateTime={post.metadata.date}>{formatDate(post.metadata.date)}</time>
                </small>
            </section>
            <article className="prose px-4 py-8 dark:prose-invert space-y-4 flex-grow">
                <CustomMDX source={post.content} />
            </article>
            <footer className="mt-4 flex flex-col items-center justify-center space-y-4 prose px-4 py-8 dark:prose-invert flex-grow">
                <Image src="/logo/Logo.svg" alt="JosePablo Logo" width={60} height={60} />
                <p className="text-sm text-gray-500 dark:text-gray-400">Designed by José Pablo</p>
            </footer>
        </div>
    )
}

export default PostPage

