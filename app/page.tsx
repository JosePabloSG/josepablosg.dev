import Image from "next/image"
import Link from "next/link"
import Container from "@/components/container"
import GridLayout from "@/components/grid-layout"
import { gridItems } from "@/config/grid-items"
import { lgLayout, mdLayout, smLayout } from "@/config/layouts"

export default function Home() {
    return (
        <>
            <Container as="header" className="flex items-center justify-between py-0">
                <h1 className="hidden">JosePabloSG</h1>
            </Container>
            <main className="py-8">
                <GridLayout lgLayout={lgLayout} mdLayout={mdLayout} smLayout={smLayout}>
                    {gridItems.map((item) => (
                        <div key={item.i}>{<item.component />}</div>
                    ))}
                </GridLayout>
            </main>
            <footer className="py-4">
                <Container className="flex justify-center items-center">
                    <div className="flex items-center space-x-2">
                        <Image src="/logo/Logo.svg" alt="José Pablo Logo" width={24} height={24} />
                        <p className="text-sm text-muted-foreground">
                            © 2025 José Pablo - Inspired by{" "}
                            <Link href="https://nevflynn.com/" className="underline hover:text-primary">
                                NevFlynn
                            </Link>
                        </p>
                    </div>
                </Container>
            </footer>
        </>
    )
}

