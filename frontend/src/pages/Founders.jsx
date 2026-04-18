import React from 'react';

const Founders = () => {
    return (
        <div className="animate-[fadeIn_0.5s_ease-out] py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Meet the Founder</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                    The visionary behind OrderNest, redefining the food delivery experience.
                </p>
            </div>

            <div className="flex justify-center max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center text-center max-w-xl w-full">
                    <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-slate-700 mb-8 overflow-hidden shadow-inner">
                        <img
                            src="/images/dhruv.jpeg"
                            alt="Founder"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Dhruv&background=10b981&color=fff"; }}
                        />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Dhruv</h3>
                    <p className="text-emerald-500 font-medium mb-6 text-lg">Founder & Developer</p>
                    <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg">
                        Hi, I’m Dhruv, a Computer Engineering student with a strong interest in full-stack development and emerging technologies like Artificial Intelligence and Machine Learning. I enjoy building real-world applications that combine efficient backend systems with clean and intuitive user interfaces. My key areas of interest include web development, system design, API development, and exploring how AI/ML can enhance modern applications.
                    </p>
                    <div className="flex gap-6 mt-auto text-sm font-bold tracking-wide uppercase">
                        <a href="https://linkedin.com/in/dhruv-parsana-0702feb" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400 transition-colors">LinkedIn</a>
                        <a href="https://github.com/DhruvP-7Feb" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-400 transition-colors">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Founders;
