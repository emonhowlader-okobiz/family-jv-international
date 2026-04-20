import React from 'react'

const Cta = () => {
    return (
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
    )
}

export default Cta