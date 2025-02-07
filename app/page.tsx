import Container from "@/components/container"
import GridLayout from "@/components/grid-layout"
import { gridItems } from "@/config/grid-items"
import { lgLayout, mdLayout, smLayout } from "@/config/layouts"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Container as="header" className="flex items-center justify-between py-0">
                <h1 className="hidden">JosePabloSG</h1>
            </Container>
            <main className="py-8 flex-grow">
                <GridLayout lgLayout={lgLayout} mdLayout={mdLayout} smLayout={smLayout}>
                    {gridItems.map((item) => (
                        <div key={item.i}>{<item.component />}</div>
                    ))}
                </GridLayout>
            </main>
        </div>
    )
}

