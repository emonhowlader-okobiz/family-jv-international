import React from 'react'

const AboutUsSection = () => {
    return (
        <section className="py-32 bg-surface-container-low overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    <div className="w-full lg:w-5/12 relative">
                        <div className="absolute -inset-4 bg-surface-container-highest rounded-2xl -z-10 translate-y-8 translate-x-8"></div>
                        <img
                            alt=""
                            className="w-full aspect-[4/5] object-cover rounded-xl shadow-[0_20px_40px_-10px_rgba(27,27,30,0.1)]"
                            data-alt="Wide angle view of a modern sunlit corporate boardroom with floor to ceiling windows overlooking a major global city skyline"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHjlLbIjSwxvLvnjFa1lxweapDXBwnUgQ8OPyHUY1WZaivlQ9PEfXfCS39E8iN8Byswpx9aSAVM2DwmqPu5hIK_girsOs_AiD7NMLycoNOufHZYV1jfHzVV1hMuPKjM7i7QP3jqs5UPjyOuKm1VhOWxKG0qo2cwb_Vw3ylqFUSk8qpHV_vOEJtNkLv_laXV9ahld0eVvYKNFYD-24UdwZk8iZogh3hXNdVYQa38GHdQ64peR0SaJSpEvA2pUgPlimPa6pZJbPNGw"
                        />
                        {/* Glassmorphic accent overlay */}
                        <div className="absolute -bottom-8 -right-8 bg-surface/80 backdrop-blur-xl p-8 rounded-xl max-w-[280px] shadow-[0_20px_40px_-10px_rgba(27,27,30,0.08)] hidden md:block">
                            <span className="text-4xl font-headline font-bold text-primary block mb-2">25+</span>
                            <span className="text-on-surface-variant text-sm font-medium">Years of unyielding excellence in global markets.</span>
                        </div>
                    </div>
                    <div className="w-full lg:w-7/12">
                        <span className="block text-secondary tracking-[0.05em] uppercase text-sm font-bold mb-6 font-label">Our Legacy</span>
                        <h2 className="text-primary font-headline font-bold text-4xl md:text-5xl leading-[1.1] tracking-[-0.02em] mb-8">
                            Bridging Continental Divides.
                        </h2>
                        <p className="font-body text-on-surface-variant text-lg leading-[1.8] mb-8">
                            Family JV International Business Ltd. is not merely a facilitator of trade; we are architects of global supply chains. With roots deeply embedded in maritime heritage and eyes fixed firmly on the digital horizon, we engineer pathways for commerce that defy friction.
                        </p>
                        <p className="font-body text-on-surface-variant text-base leading-[1.8] mb-12">
                            Our commitment is absolute: to deliver meticulous curation, ironclad compliance, and strategic foresight in every container we move. We partner with sovereign entities and private enterprises alike to ensure that goods flow not just seamlessly, but beautifully.
                        </p>
                        <a className="inline-flex items-center gap-3 text-primary font-semibold border-b-2 border-outline-variant pb-1 hover:border-primary transition-colors" href="#">
                            Discover Our Heritage
                            <span className="material-symbols-outlined text-sm" data-icon="east">east</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUsSection