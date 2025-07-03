'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuccessMessage = () => (
    <div className="bg-green-50 rounded-lg p-8 text-center mb-6">
        <div className="mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
        </div>
        <h2 className="text-xl font-bold mb-2 text-green-800">Payment Successful</h2>
        <p className="text-green-600">Thank you for your payment. Your Ticket is being processed.</p>
    </div>
);

const FormFill = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        organisation: '',
        designation: '',
        gstin: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const SERVICE_URL = process.env.NEXT_PUBLIC_SERVICE_URL;
    const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    useEffect(() => {
        if (paymentSuccess) {
            const timer = setTimeout(() => {
                setPaymentSuccess(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [paymentSuccess]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatDateTime = () => {
        const now = new Date();
        return now.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            alert('Razorpay SDK failed to load');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(
                `${SERVICE_URL}/api/register-user`,
                formData
            );
            const { user, payment } = data;

            const rzp = new window.Razorpay({
                key: RAZORPAY_KEY_ID,
                amount: payment.amount,
                currency: payment.currency,
                name: 'Insurtech India',
                description: 'Registration Payment',
                order_id: payment.orderId,
                handler: function (response) {
                    setPaymentSuccess(true);
                    setFormData({
                        name: '',
                        email: '',
                        mobile: '',
                        organisation: '',
                        designation: '',
                        gstin: ''
                    });
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.mobile,
                },
                notes: payment.notes,
                theme: { color: '#0A5FFF' },
            });

            rzp.on('payment.failed', function (response) {
                setMessage('Payment failed: ' + response.error.description);
            });

            rzp.open();
        } catch (err) {
            console.error(err);
            setMessage('Error during registration or payment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="registration-form" className="flex items-center flex-col justify-center p-4">
            <div className='w-[85%] mx-auto mb-6'>
                <h2 className='text-left text-3xl xl:text-8xl font-bold uppercase'>Register</h2>
            </div>
            <div className="xl:bg-[#1A1A1A] bg-none xl:rounded-[40px] xl:px-[98px] xl:py-[150px] xl:mt-[100px] xl:max-w-[85%] max-w-5xl w-full rounded-lg p-4 md:p-12 flex flex-col md:flex-row justify-between gap-8 md:gap-16">
                <div className="flex flex-col gap-4 mdw-1/3 text-white">
                    <h2 className="text-2xl xl:text-7xl font-bold">We're Here To Assist You</h2>
                    <p className="text-gray-300 xl:text-2xl xl:mt-1 text-sm">Life is a celebration, and we at PartyHard believe everyone should celebrate, not just the grand occasions</p>
                    <div className="space-y-10 xl:mt-5">
                        <div>
                            <h3 className="font-semibold mb-1 xl:text-5xl xl:pb-1">Contact Us</h3>
                            <p className="text-gray-300 text-sm xl:text-2xl">+917042428894</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1 xl:text-5xl xl:pb-1">Email</h3>
                            <p className="text-gray-300 text-sm xl:text-2xl">tanvi@indiainsurtech.com</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1 xl:text-5xl xl:pb-1">Event Location</h3>
                            <p className="text-gray-300 text-sm xl:text-2xl">Fairmont, Mumbai</p>
                        </div>
                    </div>
                </div>
                <div className="md:w-2/3 bg-white rounded-3xl p-8">
                    <h2 className="text-3xl font-bold mb-4 text-black">Register Here</h2>
                    <p className="text-gray-600 mb-6 text-sm">Complete the registration form and proceed to payment</p>
                    {paymentSuccess && <SuccessMessage />}
                    {message && <p className="text-sm text-emerald-600 mb-4">{message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border-b-2 border-gray-300 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 bg-transparent"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border-b-2 border-gray-300 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 bg-transparent"
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                className="w-full border-b-2 border-gray-300 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 bg-transparent"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="organisation"
                                placeholder="Organisation Name"
                                value={formData.organisation}
                                onChange={handleChange}
                                required
                                className="w-full border-b-2 border-gray-300 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 bg-transparent"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="designation"
                                placeholder="Designation"
                                value={formData.designation}
                                onChange={handleChange}
                                required
                                className="w-full border-b-2 border-gray-300 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 bg-transparent"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="gstin"
                                placeholder="GSTIN (N/A In Case Individuals)"
                                value={formData.gstin}
                                onChange={handleChange}
                                className="w-full border-b-2 border-gray-300 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 bg-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-32 mt-8 bg-gradient-to-r from-emerald-500 to-sky-500 text-white py-3 px-6 rounded-full hover:bg-teal-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormFill;