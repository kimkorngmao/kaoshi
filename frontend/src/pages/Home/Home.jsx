import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { NavBar } from '../../components/NavBar/NavBar'

export const Home = () => {
    const { isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()

    if (isAuthenticated) {
        navigate('/dashboard')
    }

    return (
        <>
            <NavBar />
            <section className="relative">
                <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform" aria-hidden="true">
                    <img
                        alt="Stripes"
                        fetchPriority="high"
                        width="768"
                        height="438"
                        decoding="async"
                        className="max-w-none"
                        src="https://simple.cruip.com//_next/static/media/stripes.39fe7903.svg"
                    />
                </div>
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="pb-12 pt-32 md:pb-20 md:pt-40">
                        <div className="pb-12 text-center md:pb-16">
                            <h1
                                className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
                            >
                                KaiHua
                            </h1>
                            <div className="mx-auto max-w-3xl">
                                <p className="mb-8 text-lg text-gray-700" data-aos="zoom-y-out" data-aos-delay="300">
                                Better education develops the nation
                                </p>
                                <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]">
                                    <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center" data-aos="zoom-y-out" data-aos-delay="450">
                                        <Link to="/login" className="p-3 rounded-xl btn group mb-4 w-full bg-gradient-to-t from-blue-600 to-blue-500 text-white shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto">
                                            <span className="relative inline-flex items-center">
                                                Go to Login <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">-&gt;</span>
                                            </span>
                                        </Link>
                                        <Link to="/login" className="p-3 rounded-xl btn w-full bg-white text-gray-800 shadow hover:bg-gray-50 sm:ml-4 sm:w-auto">
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="pb-12 md:pb-20">
                        <div className="relative flex h-[324px] items-center justify-center">
                            {/* Background circles */}
                            <div className="absolute -z-10">
                                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width="164" height="41" viewBox="0 0 164 41" fill="none">
                                    <circle cx="1" cy="8" r="1" fillOpacity="0.24"></circle>
                                    <circle cx="1" cy="1" r="1" fillOpacity="0.16"></circle>
                                    <circle cx="1" cy="15" r="1"></circle>
                                    <circle cx="1" cy="26" r="1" fillOpacity="0.64"></circle>
                                    <circle cx="1" cy="33" r="1" fillOpacity="0.24"></circle>
                                    <circle cx="8" cy="8" r="1"></circle>
                                    <circle cx="8" cy="15" r="1"></circle>
                                    <circle cx="8" cy="26" r="1" fillOpacity="0.24"></circle>
                                    <circle cx="15" cy="15" r="1" fillOpacity="0.64"></circle>
                                    <circle cx="15" cy="26" r="1" fillOpacity="0.16"></circle>
                                    <circle cx="8" cy="33" r="1"></circle>
                                    <circle cx="1" cy="40" r="1"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 7)" fillOpacity="0.24"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 0)" fillOpacity="0.16"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 14)"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 25)" fillOpacity="0.64"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 32)" fillOpacity="0.24"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 157 7)"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 157 14)"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 157 25)" fillOpacity="0.24"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 150 14)" fillOpacity="0.64"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 150 25)" fillOpacity="0.16"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 157 32)"></circle>
                                    <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 39)"></circle>
                                </svg>
                            </div>

                            {/* Blur effects */}
                            <div className="absolute -z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="432" height="160" viewBox="0 0 432 160" fill="none">
                                    <g opacity="0.6" filter="url(#filter0_f_2044_9)">
                                        <path className="fill-blue-500" fillRule="evenodd" clipRule="evenodd" d="M80 112C62.3269 112 48 97.6731 48 80C48 62.3269 62.3269 48 80 48C97.6731 48 171 62.3269 171 80C171 97.6731 97.6731 112 80 112ZM352 112C369.673 112 384 97.6731 384 80C384 62.3269 369.673 48 352 48C334.327 48 261 62.3269 261 80C261 97.6731 334.327 112 352 112Z"></path>
                                    </g>
                                    <defs>
                                        <filter id="filter0_f_2044_9" x="0" y="0" width="432" height="160" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                            <feGaussianBlur stdDeviation="32" result="effect1_foregroundBlur_2044_9"></feGaussianBlur>
                                        </filter>
                                    </defs>
                                </svg>
                            </div>

                            {/* Gradient lines */}
                            <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply"></div>
                            <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply"></div>
                            <div className="absolute inset-x-[200px] top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent mix-blend-multiply"></div>
                            <div className="absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-[82px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply before:absolute before:inset-y-0 before:w-24 before:animate-[line_10s_ease-in-out_infinite_both] before:bg-gradient-to-r before:via-blue-500"></div>
                            <div className="absolute inset-x-0 top-1/2 -z-10 h-px translate-y-[82px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply before:absolute before:inset-y-0 before:w-24 before:animate-[line_10s_ease-in-out_infinite_5s_both] before:bg-gradient-to-r before:via-blue-500"></div>
                            <div className="absolute inset-x-[300px] top-1/2 -z-10 h-px rotate-[20deg] bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply"></div>
                            <div className="absolute inset-x-[300px] top-1/2 -z-10 h-px -rotate-[20deg] bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply"></div>
                            <div className="absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-[216px] bg-gradient-to-b from-gray-200 to-transparent mix-blend-multiply"></div>
                            <div className="absolute inset-y-0 left-1/2 -z-10 w-px translate-x-[216px] bg-gradient-to-t from-gray-200 to-transparent mix-blend-multiply"></div>

                            {/* Spinning animation */}
                            <div className="absolute before:absolute before:-inset-3 before:animate-[spin_3s_linear_infinite] before:rounded-full before:border before:border-transparent before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] before:[background:conic-gradient(from_180deg,transparent,theme(colors.blue.500))_border-box]">
                                <div className="animate-[breath_8s_ease-in-out_infinite_both]">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
                                        <img alt="Logo 01" className="relative" src="https://simple.cruip.com//_next/static/media/logo-01.84f0bef6.svg" width="32" height="32" />
                                    </div>
                                </div>
                            </div>

                            {/* Logos */}
                            <div className="relative flex flex-col">
                                <article className="flex h-full w-full items-center justify-center">
                                    {/* Logo 02 */}
                                    <div className="absolute -translate-x-[136px]">
                                        <div className="animate-[breath_7s_ease-in-out_3s_infinite_both]">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                                                <img alt="Logo 02" className="relative" src="https://simple.cruip.com//_next/static/media/logo-02.c53c3b66.svg" width="23" height="22" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Logo 03 */}
                                    <div className="absolute translate-x-[136px]">
                                        <div className="animate-[breath_7s_ease-in-out_3.5s_infinite_both]">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                                                <img alt="Logo 03" className="relative" src="https://simple.cruip.com//_next/static/media/logo-03.3b762385.svg" width="22" height="22" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Logo 04 */}
                                    <div className="absolute -translate-x-[216px] -translate-y-[82px]">
                                        <div className="animate-[breath_6s_ease-in-out_3.5s_infinite_both]">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                                                <img alt="Logo 04" className="relative" src="https://simple.cruip.com//_next/static/media/logo-04.5487b301.svg" width="24" height="22" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Logo 05 */}
                                    <div className="absolute -translate-y-[82px] translate-x-[216px]">
                                        <div className="animate-[breath_6s_ease-in-out_1.5s_infinite_both]">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                                                <img alt="Logo 05" className="relative" src="https://simple.cruip.com//_next/static/media/logo-05.6c7db8f6.svg" width="25" height="25" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Logo 06 */}
                                    <div className="absolute translate-x-[216px] translate-y-[82px]">
                                        <div className="animate-[breath_6s_ease-in-out_2s_infinite_both]">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                                                <img alt="Logo 06" className="relative" src="https://simple.cruip.com//_next/static/media/logo-06.c9627b6e.svg" width="20" height="18" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Logo 07 */}
                                    <div className="absolute -translate-x-[216px] translate-y-[82px]">
                                        <div className="animate-[breath_6s_ease-in-out_2.5s_infinite_both]">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                                                <img alt="Logo 07" className="relative" src="https://simple.cruip.com//_next/static/media/logo-07.e50f4152.svg" width="25" height="25" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Logo 08 */}
                                    <div className="absolute -translate-x-[292px] opacity-40">
                                        <div className="animate-[breath_6s_ease-in-out_2s_infinite_both]">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/60 bg-white shadow-lg">
                                                <img alt="Logo 08" className="relative" src="https://simple.cruip.com//_next/static/media/logo-08.121dd6fc.svg" width="20" height="20" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Logo 09 */}
                                    <div className="absolute translate-x-[292px] opacity-40">
                                        <div className="animate-[breath_6s_ease-in-out_4s_infinite_both]">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/60 bg-white shadow-lg">
                                                <img alt="Logo 09" className="relative" src="https://simple.cruip.com//_next/static/media/logo-09.177906bf.svg" width="21" height="13" />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
