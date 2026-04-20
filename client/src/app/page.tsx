import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <header className="relative min-h-[972px] flex items-center pt-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            alt=""
            className="w-full h-full object-cover opacity-60"
            data-alt="Massive container ship navigating through misty ocean waters at dawn with dramatic golden light hitting the steel cargo boxes"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9VQI6FJbsdFfFUV0p6UESLup6-kGY3kchR6cyIfE4ajsr1QKX9uN3G2ce1AvOW0VeNrfa74TxozYkErE5aVcEBbzSneMjmYlJiocz-mTeEmmIb7W2sIGkcOBqTMEbWtpj-xOs2RCu2R59ii6YmbRVO1p64OTMwMB4NUUUOT3aDMogWzE6rS3-pmtQ2-r8S_yi_Ha6UVE-w1abGnTBAakGpkCSR1l0zHzS7I7EW0TJvWBTuRJP7TuHJGG9As-yVWLqY8NJKJmG2zQ"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <span className="block text-secondary-fixed tracking-[0.05em] uppercase text-sm font-bold mb-6 font-label">Global Curator of Commerce</span>            {/* eslint-disable-next-line react/no-unescaped-entities */}            <h1 className="text-on-primary font-headline font-bold text-5xl md:text-6xl tracking-[-0.02em] mb-8" style={{ lineHeight: 1.1 }}>
              Orchestrating Global Trade with Unyielding Precision.
            </h1>
            <p className="text-primary-fixed-dim font-body text-lg leading-[1.6] mb-12 max-w-xl">
              We transcend traditional logistics, crafting bespoke import and export solutions for the world's most demanding enterprises.
            </p>
            <button className="bg-secondary-container text-on-secondary-container font-headline font-semibold px-8 py-4 rounded-xl hover:bg-secondary-fixed transition-colors duration-300 shadow-[0_20px_40px_-10px_rgba(27,27,30,0.2)]">
              Get a Quote
            </button>
          </div>
        </div>
      </header>
      {/* Export Preview */}
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
      {/* Import Preview */}
      <section className="py-32 bg-surface">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="block text-secondary tracking-[0.05em] uppercase text-sm font-bold mb-4 font-label">Inbound Sourcing</span>
              <h2 className="text-primary font-headline font-semibold text-4xl md:text-[2.5rem] leading-[1.2] tracking-tight">
                Strategic Import Acquisition
              </h2>
            </div>
            <button className="flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors duration-300 group">
              View All Imports
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </div>
          {/* Asymmetric Grid for variety */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Large Card */}
            <div className="lg:col-span-7 bg-surface-container-low rounded-xl overflow-hidden group flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-alt="High tech server room with rows of blinking blue lights stretching into infinity in a dark sterile environment"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwpFxmfbq3NsWA2kfzAjgNhclhMuZTxbAGJG1K34stiIYnGjNoqLUyxmImS7kTog3SX0J65w3o-Ciu9ly9MKG3yLRDcFXECyFvQd_W9DLsoe67u_h1v5SI6xbunKj2elLEo-Qt8oWMrXk5AO1Df5ILCZ12Kz1LCP8EqzFkzgpCHbLywhBJc9OqzsNU7BSwJ0rciG_RZG7NdT0SfT6xtaXa4oA07Nsl3fDcvEF7BTj-GLlN-lpPS1u2l1JWHO8HWUNBpBVGHhZOmXc"
                />
              </div>
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                <h3 className="font-headline font-semibold text-2xl text-primary mb-4">Advanced Technology</h3>
                <p className="font-body text-on-surface-variant text-base leading-[1.6] mb-8">Procuring cutting-edge electronics and semiconductor technology to empower domestic innovation securely and efficiently.</p>
                <div className="mt-auto">
                  <span className="text-secondary text-sm font-bold uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">Explore Sector</span>
                </div>
              </div>
            </div>
            {/* Small Cards Stack */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-surface-container-lowest rounded-xl p-8 flex items-center gap-8 group cursor-pointer hover:bg-surface-container-low transition-colors duration-300 shadow-[0_20px_40px_-10px_rgba(27,27,30,0.02)]">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                  <img
                    alt=""
                    className="w-full h-full object-cover"
                    data-alt="Rows of generic pharmaceutical blister packs stacked neatly in a clean bright clinical setting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxp7WYd0_cXpwCnehIJIxgQuHgWY21Ysv5gmJMfUgs3P5FYUxlLQunTMRCuHeefx4EHFKRNiZa6tuKA0RbubSWkmRDC56SOpVPYtfFAdZZPO49vSYDZNhj95oQP4o7kfEsXpP11zpsJvvVkP0f95GqRnqcaMeMgCn2zGuH_cImfx4kgGuOX4QApV4R6Z89RvdkJ7L37vA614EwJ1PUviqDRY9MA9DADS0OI2pdS-nfxgbAnb2KmkvZd0dcEK76m2xiWOC0fGk2M7w"
                  />
                </div>
                <div>
                  <h3 className="font-headline font-semibold text-lg text-primary mb-2 group-hover:text-secondary transition-colors">Pharmaceuticals</h3>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed line-clamp-2">Compliant handling of critical medical supplies.</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-8 flex items-center gap-8 group cursor-pointer hover:bg-surface-container-low transition-colors duration-300 shadow-[0_20px_40px_-10px_rgba(27,27,30,0.02)]">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                  <img
                    alt=""
                    className="w-full h-full object-cover"
                    data-alt="Sleek modern electric vehicle components beautifully lit against a dark studio background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS6YHII5aAFnw1XosBTNeGH2Ya3V1OWBHCKpgVsb_mPRLhGu239EqpwnjMSIOLG0GGXVxONokukdXqhAVly8JUmFoCez11xSOX73hNUlRlz4SD5F4N4ig18W9ytQCtslFMlRxPGRpBT-RPLFSZHpUuH1JvX_YQsF8YtwPGZB9bwtGb_VyMW5vod3xZ__GAxhZXTJphej8yxcGs8g2OL00RCzO6uEW87eWoFe4-_o3KUPkvi44i1HvtCr-k0Ap2LwEHJwC7uiB7_aE"
                  />
                </div>
                <div>
                  <h3 className="font-headline font-semibold text-lg text-primary mb-2 group-hover:text-secondary transition-colors">Automotive Parts</h3>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed line-clamp-2">Just-in-time delivery for manufacturing assembly lines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Us Summary (Asymmetric Editorial Layout) */}
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
      {/* Partner Logos Marquee */}
      <section className="py-20 bg-surface border-y border-outline-variant/20">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
          <span className="block text-center text-on-surface-variant text-sm font-medium uppercase tracking-widest mb-12">Trusted by Global Enterprises</span>
          <div className="flex items-center justify-between opacity-40 grayscale gap-8 md:gap-16 overflow-x-auto no-scrollbar">
            {/* Abstract geometric shapes to represent logos */}
            <svg className="h-8 md:h-10 w-auto shrink-0" fill="currentColor" viewBox="0 0 100 30"><path d="M10,15 L20,5 L30,15 L20,25 Z M40,10 H60 V20 H40 Z M70,5 A10,10 0 1,1 90,25 A10,10 0 1,1 70,5 Z"></path></svg>
            <svg className="h-8 md:h-10 w-auto shrink-0" fill="currentColor" viewBox="0 0 120 30"><rect height="20" rx="4" width="20" x="0" y="5"></rect><circle cx="50" cy="15" r="10"></circle><path d="M80,25 L90,5 L100,25 Z"></path></svg>
            <svg className="h-8 md:h-10 w-auto shrink-0" fill="currentColor" viewBox="0 0 100 30"><circle cx="15" cy="15" r="15"></circle><circle cx="50" cy="15" r="10"></circle><circle cx="85" cy="15" r="15"></circle></svg>
            <svg className="h-8 md:h-10 w-auto shrink-0" fill="currentColor" viewBox="0 0 110 30"><path d="M0,15 Q15,0 30,15 T60,15 T90,15" fill="none" stroke="currentColor" strokeWidth="4"></path></svg>
            <svg className="h-8 md:h-10 w-auto shrink-0" fill="currentColor" viewBox="0 0 100 30"><rect height="30" width="30" x="0" y="0"></rect><rect height="10" width="65" x="35" y="10"></rect></svg>
          </div>
        </div>
      </section>
      {/* Mission & Vision */}
      <section className="py-32 bg-surface">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Mission Card */}
            <div className="bg-primary text-on-primary p-12 md:p-16 rounded-2xl flex flex-col justify-between min-h-[400px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-8 block" data-icon="language">language</span>
                <h3 className="font-headline font-bold text-3xl mb-6">Our Mission</h3>
                <p className="font-body text-primary-fixed-dim text-lg leading-[1.7]">
                  To orchestrate frictionless international commerce by providing tailored, compliant, and sovereign-grade logistical architecture to visionary enterprises worldwide.
                </p>
              </div>
            </div>
            {/* Vision Card */}
            <div className="bg-surface-container-low text-primary p-12 md:p-16 rounded-2xl flex flex-col justify-between min-h-[400px]">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-8 block" data-icon="visibility">visibility</span>
                <h3 className="font-headline font-bold text-3xl mb-6">Our Vision</h3>
                <p className="font-body text-on-surface-variant text-lg leading-[1.7]">
                  To be the undisputed apex curator of global trade routes, recognized universally for transmuting complex logistical challenges into elegant operational flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Bottom CTA */}
      <section className="bg-primary py-24 relative overflow-hidden">
        {/* Abstract gradient background accent */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-container rounded-full blur-[120px] opacity-50 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 relative z-10 text-center">
          <h2 className="font-headline font-bold text-4xl md:text-5xl text-on-primary tracking-tight mb-6 max-w-4xl mx-auto">
            Ready to elevate your supply chain?
          </h2>
          <p className="font-body text-secondary-fixed text-xl md:text-2xl mb-12 font-medium">
            Partner with us for global success.
          </p>
          <button className="bg-secondary-container text-on-secondary-container font-headline font-bold text-lg px-10 py-5 rounded-xl hover:bg-secondary-fixed transition-colors duration-300 shadow-[0_20px_40px_-10px_rgba(27,27,30,0.3)]">
            Contact Us Today
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}
