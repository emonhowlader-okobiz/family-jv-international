import React from 'react'

const PartnerLogoSection = () => {
    return (
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
    )
}

export default PartnerLogoSection