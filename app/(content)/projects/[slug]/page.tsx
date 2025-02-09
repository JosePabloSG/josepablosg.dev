import Container from '@/components/container';
import GridLayout from '@/components/grid-layout';
import { CustomMDX } from '@/components/mdx';
import Anchor from '@/components/ui/anchor';
import { Badge } from '@/components/ui/badge';
import Card from '@/components/ui/card';
import { lgLayout, smLayout } from '@/config/project-layout';
import { siteConfig } from '@/config/site';
import { getAllProjects } from '@/lib/mdx';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { FaArrowRight, FaX } from 'react-icons/fa6';

type Params = Promise<{ slug: string }>;

export const generateStaticParams = async () =>
    getAllProjects().map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({ params }: { params: Params }) => {
    const { slug } = await params;

    const project = getAllProjects().find((project) => project.slug === slug);

    if (!project) return;

    const { title, description } = project.metadata;

    return {
        title: `${title} — Projects`,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            url: `${siteConfig.url}/projects/${project.slug}`,
            authors: 'JosePabloSG',
        },
        github: {
            title,
            description,
        },
        alternates: {
            canonical: `${siteConfig.url}/projects/${project.slug}`,
        },
    };
};

const ProjectPage = async ({ params }: { params: Params }) => {
    const { slug } = await params;

    const project = getAllProjects().find((project) => project.slug === slug);

    if (!project) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: project.metadata.title,
        description: project.metadata.description,
        author: [
            {
                '@type': 'Person',
                name: 'JosePabloSG',
                url: siteConfig.url,
            },
        ],
    };

    return (
        <>
            <Script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Container className='py-8'>
                <header className='flex items-center justify-center pb-10'>
                    <Anchor
                        className='inline-flex hover:mb-6 hover:scale-125'
                        href='/'>
                        <FaX />
                        <div className='sr-only'>Close</div>
                    </Anchor>
                </header>
                <h1 className='font-calistoga text-3xl leading-relaxed'>
                    {project.metadata.title}
                </h1>
                <div className='grid grid-cols-2 gap-10 pb-8 max-md:grid-cols-1'>
                    <div>
                        <p className='text-xl font-medium leading-relaxed'>
                            {project.metadata.description}
                        </p>
                        <div className='flex flex-wrap items-center gap-3 pt-4'>
                            {JSON.parse(project.metadata.links).map(
                                (link: { url: string; name: string }) => (
                                    <Anchor
                                        key={link.url}
                                        href={link.url}
                                        target='_blank'
                                        rel='noreferrer nofollow noopener'
                                        className='inline-flex px-5 py-3 text-sm'>
                                        {link.name}
                                        <FaArrowRight className='-rotate-45 transition-transform duration-300 group-hover:rotate-0' />
                                    </Anchor>
                                )
                            )}
                        </div>
                        <div className="mt-6">
                            <h2 className="font-calistoga text-2xl leading-relaxed pb-2">Technologies</h2>
                            <div className="flex flex-wrap gap-2" aria-label="Project technologies">
                                {project.metadata.technologies &&
                                    JSON.parse(project.metadata.technologies)?.map(
                                        (tech: {
                                            name: string
                                            icon: string
                                            link: string
                                        }) => (
                                            <a
                                                key={tech.name}
                                                href={tech.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Badge>
                                                    <Image
                                                        src={tech.icon || "/placeholder.svg"}
                                                        alt={tech.name}
                                                        width={16}
                                                        height={16}
                                                        className="object-contain"
                                                        aria-hidden="true"
                                                    />
                                                    <span>{tech.name}</span>
                                                </Badge>
                                            </a>
                                        ),
                                    )}
                            </div>
                        </div>
                    </div>
                    <article className='prose dark:prose-invert space-y-4'>
                        <CustomMDX source={project.content} />
                    </article>
                </div>
            </Container>
            {project.metadata.images && (
                <GridLayout
                    lgLayout={lgLayout}
                    mdLayout={lgLayout}
                    smLayout={smLayout}
                    className='-mt-8 pb-16'>
                    {JSON.parse(project.metadata.images).map(
                        (image: { i: string; url: string }) => (
                            <div key={image.i}>
                                <Card className='relative'>
                                    <Image
                                        src={image.url}
                                        alt={project.metadata.title}
                                        fill
                                        objectFit='cover'
                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    />
                                </Card>
                            </div>
                        )
                    )}
                </GridLayout>
            )}
        </>
    );
};

export default ProjectPage;
