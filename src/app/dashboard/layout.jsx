'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { useState } from "react";

function DashboardLayout({ children }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dashboard-layout flex">
            {/* Sidebar: Transforms with translate-x */}
            <div className={`${isOpen ? '-translate-x-64' : '-translate-x-0'} transform transition-all duration-300`}>
                <Sidebar isOpen={isOpen} />
            </div>

            {/* Main content: Adjusts margin-left based on sidebar state */}
            <div className={`w-full transition-all duration-300 ${isOpen ? '-ml-64' : 'ml-0'}`}>
                <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} />
                <main className="p-4 bg-[#F5F5F5]">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
