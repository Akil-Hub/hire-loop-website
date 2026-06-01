import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full bg-[#111111] border-t border-white/10 text-white/70 text-sm">
            <div className="mx-auto max-w-6xl px-6 py-12">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row gap-10 md:gap-6 justify-between">

                    {/* Left - Logo + Tagline */}
                    <div className="flex flex-col gap-3 max-w-[200px]">
                        <Link href="/">
                            <Image src="/images/logo.png" alt="hireloop" width={100} height={40} />
                        </Link>
                        <p className="text-white/50 text-xs leading-relaxed">
                            The AI-native career platform. Built for people who take their work seriously.
                        </p>
                    </div>

                    {/* Right - Link Columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">

                        {/* Product */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-semibold text-sm">Product</h4>
                            <ul className="flex flex-col gap-2">
                                {["Job discovery", "Worker AI", "Companies", "Salary data"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-white/50 hover:text-white transition-colors text-xs">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Navigations */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-semibold text-sm">Navigations</h4>
                            <ul className="flex flex-col gap-2">
                                {["Help center", "Career library", "Contact"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-white/50 hover:text-white transition-colors text-xs">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-semibold text-sm">Resources</h4>
                            <ul className="flex flex-col gap-2">
                                {["Brand Guideline", "Newsroom"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-white/50 hover:text-white transition-colors text-xs">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        <Link href="#" className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
                            <FaFacebookF size={13} />
                        </Link>
                        <Link href="#" className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
                            <FaInstagram size={13} />
                        </Link>
                        <Link href="#" className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
                            <FaLinkedinIn size={13} />
                        </Link>
                    </div>

                    {/* Copyright + Legal */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-white/40">
                        <span>Copyright 2024 — Programming Hero</span>
                        <span className="hidden sm:block text-white/20">·</span>
                        <Link href="#" className="hover:text-white/70 transition-colors">Terms & Policy</Link>
                        <span className="hidden sm:block text-white/20">·</span>
                        <Link href="#" className="hover:text-white/70 transition-colors">Privacy Guideline</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}