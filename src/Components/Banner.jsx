'use client'
import Image from "next/image";
import { Button } from "@heroui/react";
import { Search, MapPin } from "lucide-react";
import { FaArrowCircleRight, FaBuilding, FaStar, FaUser } from "react-icons/fa";

const stats = [
    { icon:<FaArrowCircleRight/>, value: "50K", label: "Active Jobs" },
    { icon: <FaBuilding/>, value: "12K", label: "Companies" },
    { icon: <FaUser/>, value: "2M", label: "Job Seekers" },
    { icon: <FaStar/>, value: "97%", label: "Satisfaction Rate" },
];

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

export default function Banner() {
    return (
        <section className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col" >

            {/* Globe Background - breaks out of any max-w container */}


            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90" style={{
                backgroundImage: "url('/images/globe.png')"
            }}></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 pt-28 sm:pt-36 gap-5">

                {/* Badge */}
                <div className="flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 text-xs text-white/60 tracking-widest uppercase">
                    <span className="text-orange-400">🔥</span>
                    <span>50,000+ New Jobs This Month</span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-2xl">
                    Find Your Dream Job Today
                </h1>

                {/* Subtext */}
                <p className="text-white/50 text-sm sm:text-base max-w-md leading-relaxed">
                    HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
                </p>

                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row items-center w-full max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-2xl sm:rounded-full overflow-hidden px-2 py-2 gap-2 sm:gap-0">
                    <div className="flex items-center gap-2 flex-1 px-3 w-full">
                        <Search size={15} className="text-white/30 shrink-0" />
                        <input
                            type="text"
                            placeholder="Job title, skill or company"
                            className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full py-1"
                        />
                    </div>
                    <div className="hidden sm:block w-px h-5 bg-white/15" />
                    <div className="flex items-center gap-2 flex-1 px-3 w-full">
                        <MapPin size={15} className="text-white/30 shrink-0" />
                        <input
                            type="text"
                            placeholder="Location or Remote"
                            className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none w-full py-1"
                        />
                    </div>
                    <Button
                        size="sm"
                        className="bg-[#4f8ef7] hover:bg-[#3b7ef0] text-white rounded-full px-5 shrink-0 w-full sm:w-auto"
                    >
                        <Search size={15} />
                    </Button>
                </div>

                {/* Trending Tags */}
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/50">
                    <span>Trending Position:</span>
                    {trending.map((tag) => (
                        <button
                            key={tag}
                            className="border border-white/15 rounded-full px-3 py-1 hover:border-white/40 hover:text-white transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Globe Center Text */}
            <div className="relative z-10 flex flex-col items-center text-center mt-auto mb-[30vw] sm:mb-[22vw] md:mb-[18vw] px-4">
                <p className="text-white/70 text-base sm:text-xl font-light max-w-sm leading-relaxed">
                    Assisting over{" "}
                    <span className="text-[#a78bfa] font-semibold">15,000 job seekers</span>
                    {" "}find their dream positions.
                </p>
            </div>

            {/* Stats Bar */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-[#111111]/80 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 backdrop-blur-sm"
                        >
                            <span className="text-white/40 text-lg">{stat.icon}</span>
                            <div>
                                <p className="text-white text-xl sm:text-2xl font-bold">{stat.value}</p>
                                <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}