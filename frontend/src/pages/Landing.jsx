import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Landing = () => {
    return (
        <div className="bg-white dark:bg-dark-base transition-colors duration-200">
            {/* Hero section */}
            <div className="relative isolate px-6 lg:px-8">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>

                <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-40 text-center">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-white/10 hover:ring-gray-900/20 dark:hover:ring-white/20 shadow-sm transition-all duration-300">
                            Announcing our new AI-powered text optimizer.{' '}
                            <a href="#features" className="font-semibold text-primary-600 dark:text-primary-400"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl flex flex-col items-center justify-center gap-4">
                        <span className="text-primary-600 dark:text-primary-400">CodeCanvas</span>
                        <span className="text-3xl sm:text-5xl mt-2">Build your professional resume in minutes</span>
                    </h1>
                    <p className="mt-8 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                        CodeCanvas is a professional resume building website. Create an ATS-friendly, beautifully designed resume with the help of artificial intelligence. Land your dream job today.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button to="/register" size="lg" className="rounded-full px-8 font-semibold shadow-md active:scale-95 transition-transform duration-200">
                            Get started for free
                        </Button>
                        <Button to="/login" variant="ghost" className="text-sm font-semibold leading-6">
                            Log in <span aria-hidden="true" className="ml-1">→</span>
                        </Button>
                    </div>
                </div>

                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
            </div>
            {/* Feature section */}
            <div id="features" className="bg-gray-50 dark:bg-dark-surface py-24 sm:py-32 transition-colors duration-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">Land faster</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl text-balance">
                            Everything you need to write a winning resume
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Our builder includes powerful AI writing tools, elegant templates, and an intuitive interface.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {[
                                {
                                    name: 'AI Optimization',
                                    description: 'Generate powerful bullet points and summaries instantly by clicking our AI enhance button.',
                                    icon: '✨'
                                },
                                {
                                    name: 'Live Preview',
                                    description: 'See your changes in real-time. No need to hit refresh or guess how your resume will look.',
                                    icon: '👀'
                                },
                                {
                                    name: 'Multiple Templates',
                                    description: 'Switch between dozens of professional templates with just a single click.',
                                    icon: '🎨'
                                },
                                {
                                    name: 'PDF Exporting',
                                    description: 'Download pixel-perfect PDFs ready to bypass applicant tracking systems (ATS).',
                                    icon: '📄'
                                }
                            ].map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 dark:bg-primary-500 text-xl shadow-sm">
                                            {feature.icon}
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Landing;
