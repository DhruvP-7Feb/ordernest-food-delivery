import React from 'react';

const About = () => {
    return (
        <div className="animate-[fadeIn_0.5s_ease-out] py-12">
            <div className="bg-emerald-50 dark:bg-slate-800 rounded-3xl p-10 border border-emerald-100 dark:border-slate-700 max-w-4xl mx-auto shadow-sm">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">About OrderNest</h1>
                
                <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                    <p>
                        OrderNest is a next-generation food delivery platform built with a singular focus on speed, reliability, and an elegantly minimal user experience. 
                    </p>
                    <p>
                        Crafted meticulously without the clutter that slows down traditional apps, OrderNest provides seamless, straightforward restaurant exploration. Enjoy lightning-fast browsing and straightforward checkouts wrapped in a modern, lightweight, SaaS-inspired design.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
