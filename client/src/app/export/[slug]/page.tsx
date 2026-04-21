'use client'

import React, { useState, use } from 'react'
import Container from '@/components/shared/Container'
import { ChevronRight, Check } from 'lucide-react'
import Link from 'next/link'
import QuoteForm, { QuoteFormData } from '@/components/forms/QuoteForm'

interface Product {
    _id: string | number
    name: string
    image: string
    description: string
    category: string
    moq: number
    slug: string
}

// Sample product data - replace with actual API call
const products: { [key: string]: Product } = {
    'agricultural-commodities': {
        _id: 1,
        name: 'Agricultural Commodities',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHCo7OxekQmPm8cqQ4rOO4wNshO7ZLF5NlD7j-BZA-Zzsnd4IR8XPAGR2NT2lCFYlFFmezP8VUUoS-lEWBgCLsdVOd8aRsp6zmPcRxYBRcYDTrJkVH1WBT8logljVYJEgEmYFYqWgJiQ2neACD5vM-l6bQ_gbBjTjIpSD_fG8fWQhfHuYH7FCIJL_wZmLD70WLqR6Ez2dWP3wEl_2bYcoobSiXNL9_SVZrUDv6ssHCtalSU0DPrLU-zy3u3Ocl24MrARO1bAbyerc',
        description: 'We specialize in sourcing and distributing premium grains, fresh produce, and agricultural commodities across international borders. Our extensive network of trusted suppliers ensures consistent quality and competitive pricing for bulk orders.',
        category: 'Agriculture',
        moq: 5000,
        slug: 'agricultural-commodities'
    },
    'textiles-garments': {
        _id: 2,
        name: 'Textiles & Garments',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNjlrKGgIub_SPrH8jEFnIFvz_MBQu0GmoimWqvE0y5pwzor_v_liUFG5uiK9v2BVJt01CtXEGZe7MufFiMLh0Zr76wOujrMPj-qlNrcgDqmfXsXWlG0mTY-m5zWiEg35JqhJPzmzcaMn-wz5gFVNflc76OSlpgW2oNXray2ywLk7NDJRRRsTK-Fkg_hZsrSd4FdWm0tHaARZ5dhO7MJnyzj0V8x-M7QtxwfA6hqZy2ZTmbBnhU_aamN69s6s2Usuofb7ESUDVUaY',
        description: 'High-grade textiles and finished apparel sourced directly from top-tier manufacturers. We offer an extensive range of fabrics, yarns, and ready-made garments meeting international quality standards and certifications.',
        category: 'Textiles',
        moq: 1000,
        slug: 'textiles-garments'
    },
    'industrial-components': {
        _id: 3,
        name: 'Industrial Components',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiFn05pSltqU4FTBEMFIxUTnURUNvjjBUf0QINYEb4_pt-FEZqvF_JEaoZpkjSpgW5YoPg0HmNruJnwBGJmR3FjaJALYR-WM3G3Emz25Pq3pxDZcC-NUul6HDZqenvv7vo0su6soUiD9d3vYKe3F0mrjJqUlylkRksbAGvm7Q72Wp1wGIGb-Cfxf10yFFg_CVg5LY9Mlj9WwXfd7wLJtbAyjGW9IkBhpD9fOVcStoFfChH02XW68Po3wJ2Sk26wh6Fw73CJB5Sns',
        description: 'Critical machinery parts and industrial components ensuring seamless operational continuity. Our precision-engineered parts meet strict international standards for manufacturing, automotive, and heavy equipment industries.',
        category: 'Industrial',
        moq: 500,
        slug: 'industrial-components'
    },
    'raw-materials': {
        _id: 4,
        name: 'Raw Materials',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvtz7xXWSJ8WitnaIOb-hbHMznX9HkLKMY4nO2FiWtNqdVpmX6aylG6AFSPXaMJ3uzUaaHK9NxyUsgmJFknbOddBXkfE_nFrawmNONRGs3oM6R4Q5ibfHOYY4pON6dOxey1aPVnFKmegDHEQHj-TSiobInuqc1tKGHeIfyJY0IcnpsYWWMMZnAx1FiXfAP8F8ch5owWWEL99FZGPrADdZ5wxynOqCFoqtTl3kgPV4Rei9_XktM5zI7iMrj87RwRMGuWZQ9WpSV7Yc',
        description: 'Ethically sourced foundational resources driving global infrastructure development. From metals and minerals to polymers and chemicals, we provide consistently high-quality raw materials for manufacturing.',
        category: 'Raw Materials',
        moq: 10000,
        slug: 'raw-materials'
    }
}

export default function ExportDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const product = products[slug] || products['agricultural-commodities']
    const [quantity, setQuantity] = useState(product.moq)

    const handleQuoteSubmit = async (formData: QuoteFormData) => {
        // Add your API call here
        console.log('Quote Form Data:', { ...formData, productName: product.name, quantity })
        // Example: await submitQuoteRequest({ ...formData, productName: product.name, quantity })

        // Show success message (you can replace with toast notification)
        alert('Quote request submitted successfully! Our team will contact you shortly.')
    }

    const features = [
        'Certified Quality Standards',
        'Competitive Pricing',
        'Fast Shipping',
        'Expert Support',
        'Customizable Orders',
        'Flexible Payment Terms'
    ]

    return (
        <>
            {/* Breadcrumb */}
            <div className="pt-10 md:pt-20">
                <Container className="flex items-center gap-2 text-sm text-slate-600">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={16} />
                    <Link href="/export" className="hover:text-primary transition-colors">Export</Link>
                    <ChevronRight size={16} />
                    <span className="text-primary font-medium">{product.name}</span>
                </Container>
            </div>

            {/* Product Details Section */}
            <section className="py-10 md:pb-24">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        {/* Product Image */}
                        <div className="flex items-center justify-center">
                            <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg bg-[#f5f0e6]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>

                        {/* Product Information */}
                        <div className="flex flex-col justify-center">
                            <span className="text-secondary tracking-[0.05em] uppercase text-xs font-bold mb-3 font-label">
                                {product.category}
                            </span>
                            <h1 className="text-primary font-headline font-semibold text-4xl md:text-5xl leading-[1.2] tracking-tight mb-6">
                                {product.name}
                            </h1>
                            <p className="text-slate-600 font-body text-base leading-relaxed mb-8">
                                {product.description}
                            </p>

                            {/* Pricing and MOQ */}
                            <QuoteForm
                                productName={product.name}
                                quantity={quantity}
                                moq={product.moq}
                                onQuantityChange={setQuantity}
                                onSubmit={handleQuoteSubmit}
                            />

                            {/* Categories */}
                            <p className="text-slate-700 text-xl font-semibold mt-6">
                                Categories: <span className="font-normal">{product.category}</span>
                            </p>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="bg-[#f5f0e6] rounded-xl p-12">
                        <h2 className="text-primary font-headline font-semibold text-2xl mb-8 text-center">Why Choose Our Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-secondary">
                                            <Check size={16} className="text-white" />
                                        </div>
                                    </div>
                                    <p className="text-slate-700 font-body">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Related Products Section */}
            <section className="py-16 md:py-24 bg-white">
                <Container>
                    <h2 className="text-primary font-headline font-semibold text-3xl mb-12 text-center">Other Export Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.values(products).map((prod) => (
                            <Link key={prod._id} href={`/export/${prod.slug}`}>
                                <div className="group bg-[#fcf9f4] rounded-xl overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2 h-full">
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={prod.image}
                                            alt={prod.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-headline font-semibold text-lg text-primary mb-2">{prod.name}</h3>
                                        <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4 line-clamp-2">{prod.description}</p>
                                        <div className="h-1 w-8 bg-surface-variant group-hover:bg-secondary transition-colors duration-300"></div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    )
}