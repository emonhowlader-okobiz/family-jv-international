import React from 'react'

const ExportSection = () => {
    return (
        <section className="py-32 bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <span className="block text-secondary tracking-[0.05em] uppercase text-sm font-bold mb-4 font-label">Outbound Logistics</span>
                        <h2 className="text-primary font-headline font-semibold text-4xl md:text-[2.5rem] leading-[1.2] tracking-tight">
                            Premium Export Curations
                        </h2>
                    </div>
                    <button className="flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors duration-300 group">
                        View All Exports
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1 */}
                    <div className="group bg-surface-container-lowest rounded-xl overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2">
                        <div className="h-64 overflow-hidden">
                            <img
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                data-alt="Lush green agricultural fields viewed from above creating abstract geometric patterns in rich earthy tones"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHCo7OxekQmPm8cqQ4rOO4wNshO7ZLF5NlD7j-BZA-Zzsnd4IR8XPAGR2NT2lCFYlFFmezP8VUUoS-lEWBgCLsdVOd8aRsp6zmPcRxYBRcYDTrJkVH1WBT8logljVYJEgEmYFYqWgJiQ2neACD5vM-l6bQ_gbBjTjIpSD_fG8fWQhfHuYH7FCIJL_wZmLD70WLqR6Ez2dWP3wEl_2bYcoobSiXNL9_SVZrUDv6ssHCtalSU0DPrLU-zy3u3Ocl24MrARO1bAbyerc"
                            />
                        </div>
                        <div className="p-8">
                            <h3 className="font-headline font-semibold text-xl text-primary mb-3">Agricultural Commodities</h3>
                            <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">Sourcing and distributing premium grains and produce across international borders.</p>
                            <div className="h-1 w-8 bg-surface-variant group-hover:bg-secondary transition-colors duration-300"></div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="group bg-surface-container-lowest rounded-xl overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2 mt-0 lg:mt-8">
                        <div className="h-64 overflow-hidden">
                            <img
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                data-alt="Close up detail of intricate woven textile fabric showing rich texture and vibrant interwoven threads"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNjlrKGgIub_SPrH8jEFnIFvz_MBQu0GmoimWqvE0y5pwzor_v_liUFG5uiK9v2BVJt01CtXEGZe7MufFiMLh0Zr76wOujrMPj-qlNrcgDqmfXsXWlG0mTY-m5zWiEg35JqhJPzmzcaMn-wz5gFVNflc76OSlpgW2oNXray2ywLk7NDJRRRsTK-Fkg_hZsrSd4FdWm0tHaARZ5dhO7MJnyzj0V8x-M7QtxwfA6hqZy2ZTmbBnhU_aamN69s6s2Usuofb7ESUDVUaY"
                            />
                        </div>
                        <div className="p-8">
                            <h3 className="font-headline font-semibold text-xl text-primary mb-3">Textiles &amp; Garments</h3>
                            <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">High-grade materials and finished apparel sourced from top-tier manufacturers.</p>
                            <div className="h-1 w-8 bg-surface-variant group-hover:bg-secondary transition-colors duration-300"></div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="group bg-surface-container-lowest rounded-xl overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2">
                        <div className="h-64 overflow-hidden">
                            <img
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                data-alt="Sparks flying from precision welding machinery in a dark modern industrial manufacturing facility"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiFn05pSltqU4FTBEMFIxUTnURUNvjjBUf0QINYEb4_pt-FEZqvF_JEaoZpkjSpgW5YoPg0HmNruJnwBGFJmR3FjaJALYR-WM3G3Emz25Pq3pxDZcC-NUul6HDZqenvv7vo0su6soUiD9d3vYKe3F0mrjJqUlylkRksbAGvm7Q72Wp1wGIGb-Cfxf10yFFg_CVg5LY9Mlj9WwXfd7wLJtbAyjGW9IkBhpD9fOVcStoFfChH02XW68Po3wJ2Sk26wh6Fw73CJB5Sns"
                            />
                        </div>
                        <div className="p-8">
                            <h3 className="font-headline font-semibold text-xl text-primary mb-3">Industrial Components</h3>
                            <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">Critical machinery parts ensuring seamless operational continuity globally.</p>
                            <div className="h-1 w-8 bg-surface-variant group-hover:bg-secondary transition-colors duration-300"></div>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="group bg-surface-container-lowest rounded-xl overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2 mt-0 lg:mt-8">
                        <div className="h-64 overflow-hidden">
                            <img
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                data-alt="Stack of polished raw metallic ingots catching dramatic studio lighting against a dark background"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvtz7xXWSJ8WitnaIOb-hbHMznX9HkLKMY4nO2FiWtNqdVpmX6aylG6AFSPXaMJ3uzUaaHK9NxyUsgmJFknbOddBXkfE_nFrawmNONRGs3oM6R4Q5ibfHOYY4pON6dOxey1aPVnFKmegDHEQHj-TSiobInuqc1tKGHeIfyJY0IcnpsYWWMMZnAx1FiXfAP8F8ch5owWWEL99FZGPrADdZ5wxynOqCFoqtTl3kgPV4Rei9_XktM5zI7iMrj87RwRMGuWZQ9WpSV7Yc"
                            />
                        </div>
                        <div className="p-8">
                            <h3 className="font-headline font-semibold text-xl text-primary mb-3">Raw Materials</h3>
                            <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">Ethically sourced foundational resources driving global infrastructure.</p>
                            <div className="h-1 w-8 bg-surface-variant group-hover:bg-secondary transition-colors duration-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExportSection