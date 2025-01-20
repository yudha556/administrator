"use client";

import { useState, useEffect } from "react";
import StatistikPage from '@/components/splineArea';
import dynamic from 'next/dynamic';
const BarChart = dynamic(() => import('@/components/barChart'), {
    ssr: false,
  });
import Kalender from "@/components/kalender";
import Radikal from "@/components/radikalChart";

export default function statistik() {
    const [selectedPeriod, setSelectedPeriod] = useState('2024');
    const [dashboardData, setDashboardData] = useState({
        revenue: 0,
        repeatPurchase: 0,
        newCustomers: 0,
        totalOrders: 0,
    });

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
    };

    useEffect(() => {
        fetch("/data/penjualan.json")
            .then(response => response.json())
            .then((data) => {
                const yearData = data[selectedPeriod];
                const prevYear = String(parseInt(selectedPeriod) - 1);
                const prevYearData = data[prevYear];

                const totalRevenue = yearData.penjualan.reduce((acc, curr) => acc + curr, 0);
                const prevTotalRevenue = prevYearData ? prevYearData.penjualan.reduce((acc, curr) => acc + curr, 0) : 0;

                // kalkulasi persetase 
                const revenueChange = prevTotalRevenue ? ((totalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100 : 0;
                const repeatPurchaseChange = revenueChange * 1.2;
                const averageOrderChange = revenueChange * 0.8;
                const newCustomersChange = revenueChange * 0.9;


                setDashboardData({
                    revenue: totalRevenue,
                    repeatPurchase: Math.round(totalRevenue * 0.35),
                    averageOrder: Math.round(totalRevenue / yearData.penjualan.length),
                    newCustomers: Math.round(totalRevenue / 100),
                    changes: {
                        revenue: revenueChange.toFixed(2),
                        repeatPurchase: repeatPurchaseChange.toFixed(2),
                        averageOrder: averageOrderChange.toFixed(2),
                        newCustomers: newCustomersChange.toFixed(2)
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [selectedPeriod]);

    return (
        <div className=" w-full mt-10 mb-10">
            <div className="lg:flex-row flex-col gap-5 w-full flex justify-between">
                <div className=" p-6 rounded-3xl shadow-xl bg-gray-dark dark:bg-white w-full">
                    <h2 className="text-gray-500 font-semibold">Pendapatan</h2>
                    <p className="text-2xl font-bold mt-2 ">
                        Rp {dashboardData?.revenue?.toLocaleString('id-ID') || "0"}
                    </p>
                    <p className={`text-sm mt-1 ${Number(dashboardData?.changes?.revenue) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {Number(dashboardData?.changes?.revenue) >= 0 ? '+' : ''}{dashboardData?.changes?.revenue}%
                    </p>
                </div>

                <div className="bg-gray-dark dark:bg-white  p-6 rounded-3xl shadow-xl w-full">
                    <h2 className="text-gray-500 font-semibold">Pembelian Berulang</h2>
                    <p className="text-2xl font-bold mt-2 ">
                        Rp {dashboardData?.repeatPurchase?.toLocaleString('id-ID') || "0"}
                    </p>
                    <p className={`text-sm mt-1 ${Number(dashboardData?.changes?.repeatPurchase) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {Number(dashboardData?.changes?.repeatPurchase) >= 0 ? '+' : ''}{dashboardData?.changes?.repeatPurchase}%
                    </p>        </div>
                <div className="bg-gray-dark dark:bg-white p-6 rounded-3xl shadow-xl w-full">
                    <h2 className="text-gray-500 font-semibold">Rata-rata Pesanan</h2>
                    <p className="text-2xl font-bold mt-2 ">
                        Rp {dashboardData?.averageOrder?.toLocaleString('id-ID') || '0'}
                    </p>
                    <p className={`text-sm mt-1 ${Number(dashboardData?.changes?.averageOrder) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {Number(dashboardData?.changes?.averageOrder) >= 0 ? '+' : ''}{dashboardData?.changes?.averageOrder}%
                    </p>          </div>
                <div className="bg-gray-dark dark:bg-white p-6 rounded-3xl shadow-xl w-full">
                    <h2 className="text-gray-500 font-semibold">Pelanggan Baru</h2>
                    <p className="text-2xl font-bold mt-2 ">{dashboardData.newCustomers}</p>
                    <p className={`text-sm mt-1 ${Number(dashboardData?.changes?.newCustomers) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {Number(dashboardData?.changes?.newCustomers) >= 0 ? '+' : ''}{dashboardData?.changes?.newCustomers}%
                    </p>
                </div>
            </div>
            <div className="flex w-full mt-10 lg:flex-row flex-col gap-5">
                <div className=" lg:p-6 rounded-3xl shadow-xl w-full h-full bg-gray-dark dark:bg-primary-bg">
                    <StatistikPage />
                </div>
                <div className="w-80 h-[450px] bg-gray-dark dark:bg-primary-bg rounded-3xl shadow-xl p-6">
                    <Radikal />
                </div>
            </div>
            <div className="flex lg:flex-row-reverse flex-col gap-5 mt-10">
                <div className=" p-6 rounded-3xl shadow-xl w-full h-full bg-gray-dark dark:bg-primary-bg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-primary-text-dark dark:text-primary-text font-semibold">Laporan Penjualan</h2>
                        <div>
                            <select
                                className="border-2 border-primary-bg dark:border-dark-bg text-primary-text-dark dark:text-primary-text bg-gray-dark dark:bg-primary-bg px-3 py-1 rounded-lg text-sm"
                                value={selectedPeriod}
                                onChange={(e) => handlePeriodChange(e.target.value)}
                            >
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                            </select>
                        </div>
                    </div>
                    <div className={`mt-[30px]  transform transition-all duration-300 `}>
                        <BarChart period={selectedPeriod} />
                    </div>
                </div>
                <div className="w-80 bg-gray-dark dark:bg-primary-bg rounded-3xl shadow-xl ">
                    <Kalender />
                </div>
            </div>
        </div>
    )
}