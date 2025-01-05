'use client';

import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import CssBaseline from '@mui/material/CssBaseline';
import "../app/globals.css";

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('light'); 

    useEffect(() => {
        // Cek localStorage untuk tema yang tersimpan
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        }
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (pathname === "/login") {
        return (
            <html lang="en" className={theme}>
                <body className="h-screen">
                    <CssBaseline />
                    <main>
                        {children}
                    </main>
                </body>
            </html>
        );
    }

    return (
        <html lang="en" className={theme}>
            <body className="min-h-screen bg-dark-bg dark:bg-primary-bg text-primary-text-dark dark:text-primary-text">
                <CssBaseline />
                <div className="dashboard-layout flex min-h-screen">
                    {/* Sidebar */}
                    <div
                        className={`md:relative fixed top-0 left-0 z-50 transform transition-all duration-300 ease-in-out ${isOpen ? '-translate-x-64' : '-translate-x-0'}`}
                    >
                        <Sidebar isOpen={isOpen} />
                    </div>

                    {/* Main content with Topbar */}
                    <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? '-ml-64' : 'ml-0'}`}>
                        <Topbar toggleSidebar={toggleSidebar} isOpen={isOpen} toggleTheme={toggleTheme} theme={theme} />
                        <main className="p-4 flex-1 overflow-y-auto">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}