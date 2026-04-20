import React from 'react'

const ImportSection = () => {
    return (
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
    )
}

export default ImportSection