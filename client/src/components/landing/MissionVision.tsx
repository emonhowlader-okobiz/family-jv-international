import React from 'react'
import Container from '../shared/Container'

const MissionVision = () => {
    return (
        <section className="py-32 bg-surface">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Mission Card */}
                    <div className="bg-primary text-on-primary p-12 md:p-16 rounded-2xl flex flex-col justify-between min-h-100 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-linear-to-br from-primary-container to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10">
                            <span className="material-symbols-outlined text-4xl text-secondary mb-8 block" data-icon="language">language</span>
                            <h3 className="font-headline font-bold text-3xl mb-6 text-[#fcf9f4]">Our Mission</h3>
                            <p className="font-body text-primary-fixed-dim text-lg leading-[1.7] text-[#fcf9f4]">
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
            </Container>

        </section>
    )
}

export default MissionVision