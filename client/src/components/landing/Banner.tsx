
export const Banner = () => {
    return (
        <div className="relative min-h-[972px] flex items-center pt-20 overflow-hidden bg-primary">
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
                        We transcend traditional logistics, crafting bespoke import and export solutions for the world&apos;s most demanding enterprises.
                    </p>
                    <button className="bg-secondary-container text-on-secondary-container font-headline font-semibold px-8 py-4 rounded-xl hover:bg-secondary-fixed transition-colors duration-300 shadow-[0_20px_40px_-10px_rgba(27,27,30,0.2)]">
                        Get a Quote
                    </button>
                </div>
            </div>
        </div>
    )
}
