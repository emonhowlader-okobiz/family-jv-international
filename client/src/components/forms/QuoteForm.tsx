'use client'

import React, { useState } from 'react'

interface QuoteFormProps {
    productName: string
    quantity: number
    moq: number
    onQuantityChange: (quantity: number) => void
    onSubmit?: (formData: QuoteFormData) => Promise<void>
}

export interface QuoteFormData {
    fullName: string
    address: string
    country: string
    mobileNo: string
    email: string
    subject: string
    description: string
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
    productName,
    quantity,
    moq,
    onQuantityChange,
    onSubmit
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<QuoteFormData>({
        fullName: '',
        address: '',
        country: '',
        mobileNo: '',
        email: '',
        subject: '',
        description: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            if (onSubmit) {
                await onSubmit(formData)
            } else {
                // Default behavior - log and show alert
                console.log('Quote Form Data:', { ...formData, productName, quantity })
                alert('Quote request submitted successfully! Our team will contact you shortly.')
            }

            // Reset form
            setFormData({
                fullName: '',
                address: '',
                country: '',
                mobileNo: '',
                email: '',
                subject: '',
                description: ''
            })
        } catch (error) {
            console.error('Error submitting form:', error)
            alert('Error submitting quote request. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-[#f5f0e6] rounded-lg p-8">
            <h3 className="text-primary font-headline font-semibold text-xl mb-6">Request a Quote</h3>

            {/* Quote Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Your Name"
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary placeholder-slate-400"
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="Your Address"
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary placeholder-slate-400"
                    />
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        placeholder="Your Country"
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary placeholder-slate-400"
                    />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="tel"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleInputChange}
                        required
                        placeholder="Mobile / WhatsApp"
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary placeholder-slate-400"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Email Address"
                        className="px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary placeholder-slate-400"
                    />
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subject"
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary placeholder-slate-400"
                    />
                </div>

                {/* Quantity Info */}
                <div className="bg-white rounded-lg p-4 border border-slate-200 mb-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-slate-600 text-xs font-medium mb-1">Minimum Order Quantity</p>
                            <p className="text-primary font-headline text-lg font-bold">{moq.toLocaleString()} units</p>
                        </div>
                        <div>
                            <p className="text-slate-600 text-xs font-medium mb-1">Your Quantity</p>
                            <input
                                type="number"
                                min={moq}
                                value={quantity}
                                onChange={(e) => onQuantityChange(Number(e.target.value))}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="The product you are interested in, your market or any questions?"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary resize-none placeholder-slate-400"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-primary text-white font-headline font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base cursor-pointer"
                >
                    {isSubmitting ? 'Submitting...' : 'Get A Quote'}
                </button>
            </form>
        </div>
    )
}

export default QuoteForm
