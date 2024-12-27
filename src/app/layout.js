'use client';

import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";
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
                <body className="h-screen ">
                    <main>
                        {children}
                    </main>
                </body>
            </html>
        );
    }

    return (
        <html lang="en">
            <body className="min-h-screen overflow-hidden">
                <div className="dashboard-layout flex min-h-screen overflow-hidden">
                    {/* Sidebar */}
                    <div
                        className={` md:relative sticky top-0 left-0 z-50 transform transition-all duration-300 ease-in-out ${isOpen ? '-translate-x-64' : '-translate-x-0'}`}
                    >
                        <Sidebar isOpen={isOpen} />
                    </div>

                    {/* Main content with Navbar */}
                    <div className={`w-full transition-all duration-300 ease-in-out  ${isOpen ? '-ml-64' : 'ml-0'}`}>
                        <Topbar toggleSidebar={toggleSidebar} isOpen={isOpen} />
                        <main className="p-4 bg-[#F5F5F5] h-full overflow-y-auto">
                            {children}
                            <div className="w-full mt-10 ">
                                <Footer />
                            </div>
                        </main>

                    </div>
                </div>
            </body>
        </html>
    );
}
