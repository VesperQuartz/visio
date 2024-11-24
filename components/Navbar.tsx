'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

export default function Navbar() {
    const pathname = usePathname()
    return (
        <nav className="bg-white/10 backdrop-blur-md shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-white text-lg font-semibold">Visual AI Assistant</span>
                        </Link>
                        <div className="ml-10 flex items-center space-x-4">
                            <Link
                                href="/"
                                className={cn(
                                    "px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600 hover:bg-opacity-75 transition-colors",
                                    pathname === "/" && "bg-blue-600 bg-opacity-75"
                                )}
                            >
                                Visual Search
                            </Link>
                            <Link
                                href="/qa"
                                className={cn(
                                    "px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600 hover:bg-opacity-75 transition-colors",
                                    pathname === "/qa" && "bg-blue-600 bg-opacity-75"
                                )}
                            >
                                Q&A
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}