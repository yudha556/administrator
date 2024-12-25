"use client";

import BarChart from "@/components/barChart";
import { useState, useEffect } from "react";
import DonutChart from "@/components/donutChart";
import Grid from "@/components/dashboardGrid";
import Footer from "@/components/footer";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("2024");
  const [dashboardData, setDashboardData] = useState({
    revenue: 0,
    repeatPurchase: 0,
    newCustomers: 0,
    totalOrders: 0,
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
    <div className={`flex flex-col gap-4 lg:p-5  ${isOpen ? 'ml-64' : ''} transform  h-screen overflow-y-auto mb-[30px]`}>
    <div className={`flex lg:flex-row flex-col transition-all duration-300 gap-5 ${isOpen ? 'ml-64' : ''} transform `}>
      <div className="lg:grid lg:grid-cols-2 flex-col gap-6 w-full flex justify-center">
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-gray-500 font-semibold">Pendapatan</h2>
          <p className="text-2xl font-bold mt-2 text-black">
            Rp {dashboardData?.revenue?.toLocaleString('id-ID') || "0"}
          </p>
          <p className={`text-sm mt-1 ${Number(dashboardData?.changes?.revenue) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Number(dashboardData?.changes?.revenue) >= 0 ? '+' : ''}{dashboardData?.changes?.revenue}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-gray-500 font-semibold">Pembelian Berulang</h2>
          <p className="text-2xl font-bold mt-2 text-black">
            Rp {dashboardData?.repeatPurchase?.toLocaleString('id-ID') || "0"}
          </p>
          <p className={`text-sm mt-1 ${Number(dashboardData?.changes?.repeatPurchase) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Number(dashboardData?.changes?.repeatPurchase) >= 0 ? '+' : ''}{dashboardData?.changes?.repeatPurchase}%
          </p>        </div>
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-gray-500 font-semibold">Rata-rata Pesanan</h2>
          <p className="text-2xl font-bold mt-2 text-black">
            Rp {dashboardData?.averageOrder?.toLocaleString('id-ID') || '0'}
          </p>
          <p className={`text-sm mt-1 ${Number(dashboardData?.changes?.averageOrder) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Number(dashboardData?.changes?.averageOrder) >= 0 ? '+' : ''}{dashboardData?.changes?.averageOrder}%
          </p>          </div>
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <h2 className="text-gray-500 font-semibold">Pelanggan Baru</h2>
          <p className="text-2xl font-bold mt-2 text-black">{dashboardData.newCustomers}</p>
          <p className={`text-sm mt-1 ${Number(dashboardData?.changes?.newCustomers) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Number(dashboardData?.changes?.newCustomers) >= 0 ? '+' : ''}{dashboardData?.changes?.newCustomers}%
          </p>        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-md w-full h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-black font-semibold">Laporan Penjualan</h2>
          <div>
            <select
              className="border-2 border-black text-black px-3 py-1 rounded-lg text-sm"
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
            >
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
        <div className={`mt-[30px]  ${isOpen ? 'ml-64' : ''} transform transition-all duration-300`}>
          <BarChart period={selectedPeriod} isSidebarOpen={isOpen} style={`${isOpen ? 'w-[95%]' : 'w-[100%]'} transform transition-all duration-300`} />
        </div>
      </div>
    </div>
    <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center gap-7 mt-[10px]">
      <div className="w-full border-2 rounded-3xl ">
          <Grid />
      </div>
      <div className="flex flex-col w-full p-5 items-center lg:w-[50%] lg:h-[430px] border-2 rounded-3xl bg-white shadow-md justify-center">
        <p className="text-black mb-[20px] font-bold">Produk terlaris</p>
        <div className=" flex flex-row justify-center items-center gap-9 ">
          < DonutChart />
        </div>
      </div>
    </div>
    </div>
  );
}
export default Dashboard;