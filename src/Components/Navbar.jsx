'use client'
import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter()

    const {
        data: session
    } = useSession()
    const user = session?.user || null
    console.log(session)
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                },
            },
        });
    };

    return (
        <nav className=" fixed left-0 right-0 mx-3 md:mx-6 backdrop-blur-3g rounded-xl top-3 z-40">
            <header className="mx-auto  flex h-16 max-w-7xl items-center justify-between px-6 rounded-2xl   bg-[#222222]/90 gap-5">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-1 shrink-0">
                    <Image src={'/images/logo.png'} alt="logo" width={100} height={50} />
                </Link>

                {/* Desktop Nav Links */}
                <ul className="hidden md:flex items-center gap-8">
                    <li>
                        <Link href="/jobs" className="text-sm text-white/80 hover:text-white transition-colors">
                            Browse Jobs
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/recruiter/company" className="text-sm text-white/80 hover:text-white transition-colors">
                            Company
                        </Link>
                    </li>
                    <li>
                        <Link href="/plans" className="text-sm text-white/80 hover:text-white transition-colors">
                            Pricing
                        </Link>
                    </li>
                </ul>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <div className="w-px h-5 bg-white/20" />
                    {
                        user ? <div className="flex items-center gap-1">
                            <p>welcome {user.name}</p>
                            <Button variant="outline" onClick={handleSignOut} className="text-sm text-[#a78bfa] hover:text-[#c4b5fd] font-medium transition-colors">
                                Sign Out
                            </Button>
                        </div> : <Link href="/auth/signIn" className="text-sm text-[#a78bfa] hover:text-[#c4b5fd] font-medium transition-colors">
                            Sign In
                        </Link>
                    }

                    <Link href={'/auth/signUp'}>
                        <Button
                            className="bg-[#4f8ef7] text-white font-semibold text-sm rounded-full w-full"
                            size="sm"
                        >
                            Get Started
                        </Button>

                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-white/80 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-white/10 bg-[#1a1a2e]">
                    <ul className="flex flex-col px-6 py-4 gap-1">
                        <li>
                            <Link href="#" className="block py-2 text-sm text-white/80 hover:text-white transition-colors">
                                Browse Jobs
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="block py-2 text-sm text-white/80 hover:text-white transition-colors">
                                Company
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="block py-2 text-sm text-white/80 hover:text-white transition-colors">
                                Pricing
                            </Link>
                        </li>
                        <li className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
                            <Link href="/auth/signIn" className="text-sm text-[#a78bfa] font-medium">
                                Sign In
                            </Link>

                            <Link href={'/auth/signUp'}>
                                <Button
                                    className="bg-[#4f8ef7] text-white font-semibold text-sm rounded-full w-full"
                                    size="sm"
                                >
                                    Get Started
                                </Button>

                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}