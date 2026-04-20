
import Image from 'next/image'
import Container from '../shared/Container'
export const Banner = () => {
    return (
        <div className="relative min-h-243 flex items-center pt-20 overflow-hidden bg-primary">
            <div className="absolute inset-0 z-0">
                <Image
                    src={"/assets/hero.jpg"}
                    width={500}
                    height={500}
                    alt="heroimg"
                    className="w-full h-full object-cover opacity-60"
                    data-alt="Massive container ship navigating through misty ocean waters at dawn with dramatic golden light hitting the steel cargo boxes"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/90 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-360 mx-auto px-8 md:px-16 lg:px-24">
                <Container>
                    <span className="text-secondary font-bold">ARTISANAL COMMERCE</span>
                    <h1 className="text-[#fcf9f4] font-headline text-4xl md:text-5xl lg:text-6xl leading-tight mt-4 mb-6 font-bold">
                        Curating the World&apos;s Finest <br />Jute and Leather.
                    </h1>
                    <p className="text-secondary font-bold text-xl leading-[1.6] mb-12 max-w-lg">
                        We transcend traditional traditional commerce, sourcing and delivering the world&apos;s finest jute and leather products with a commitment to quality, sustainability, and ethical practices.
                    </p>
                    <button className="text-[#fcf9f4] p-3 bg-primary rounded">View Collection</button>
                </Container>

            </div>
        </div>
    )
}
