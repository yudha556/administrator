'use client';

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import "../app/globals.css";

export default function RootLayout({ children }) {
    // Mengambil path saat ini
    const pathname = usePathname();
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    if (pathname === "/login") {
        return (
            <html lang="en">
                <body>
                    <main>
                        {children}
                    </main>
                </body>
            </html>
        )
    }

    return (
        <html lang="en">
            <body>
                {/* Pengecualian layout global untuk halaman login */}
                    <div className="dashboard-layout flex">
                        {/* Sidebar (Hidden on smaller screens) */}
                        <div className={`hidden md:block ${isOpen ? '-translate-x-64' : 'translate-x-0'} transform transition-all duration-300`}>
                            <Sidebar isOpen={isOpen} />
                        </div>
                        {/* Main content with Navbar */}
                        <div className={`w-full transition-all duration-300 lg:${isOpen ? '-ml-64' : 'ml-0'}`}>
                            <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} />
                            <main className="p-4 bg-[#F5F5F5]">
                                {children}
                            </main>
                        </div>
                    </div>
            </body>
        </html>
    );
}
