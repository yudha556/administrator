'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import "../app/globals.css";

// Dynamic import untuk ReactApexChart agar hanya di-render di client-side
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DonutChart = ({ period = "2023" }) => {
  const [state, setState] = useState({
    series: [], // Menampung data untuk chart
    options: {
      chart: {
        type: 'donut',
        height: 350, // Menentukan tinggi chart
      },
      labels: [], // Label yang akan ditampilkan di donut chart
      plotOptions: {
        pie: {
          donut: {
            show: true,
            size: '60%', // Ukuran tengah donut
            background: 'transparent',
            labels: {
                show: true, // Tampilkan label di dalam donut
                name: {
                  show: true, // Menampilkan nama produk di tengah
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#000000',
                },
                value: {
                  show: true, // Menampilkan total di tengah
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#000000',
                  formatter: function (val) {
                    return `Rp ${val.toLocaleString()}`; // Format angka total dengan "Rp"
                  }
                }
            }
          }
        }
      },
      dataLabels: {
        enabled: false, // Nonaktifkan dataLabels default untuk menghindari penambahan nilai di luar donut
      },
      tooltip: {
        enabled: true,
        theme: 'light',
        style: {
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
        },
        y: {
          formatter: function (val) {
            return "Rp " + val.toLocaleString(); // Format tooltip dengan "Rp"
          }
        }
      },
      colors: ['#006BFF', "#4379F2", '#08C2FF', '#77CDFF'], // Warna untuk setiap bagian donut
      legend: {
        position: 'bottom', // Menempatkan legend di bawah donut chart
        horizontalAlign: 'center',
        labels: {
          useSeriesColors: true, // Gunakan warna seri untuk legend
        },
      },
    }
  });

  useEffect(() => {
    // Ambil data dari produk.json
    fetch("/data/produk.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Loaded data:", data);
        console.log("Current period:", period); // Memeriksa apakah data berhasil diterima

        if (data && data[period]) {
          const currentYearData = data[period];

          if (currentYearData && currentYearData.products) {
            const topProducts = currentYearData.products
              .sort((a, b) => b.sales - a.sales)
              .slice(0, 4); // Ambil 5 produk terlaris

            const totalSales = topProducts.reduce((acc, product) => acc + product.sales, 0); // Menghitung total penjualan

            setState(prevState => ({
              ...prevState,
              series: topProducts.map(product => product.sales), // Menampilkan jumlah penjualan produk
              options: {
                ...prevState.options,
                labels: topProducts.map(product => product.name), // Menampilkan nama produk pada donut chart
                annotations: {
                  position: 'center',
                  y: 0,
                  x: 0,
                  text: `Total\nRp ${totalSales.toLocaleString()}`, // Menampilkan total penjualan di tengah donut
                  fontSize: '20px',
                  fontWeight: 'bold',
                  fontFamily: 'Arial, sans-serif',
                  color: '#000000',
                }
              }
            }));
          } else {
            console.log(`No data found for products in the period: ${period}`);
            setState(prevState => ({
              ...prevState,
              series: [],
              options: {
                ...prevState.options,
                labels: []
              }
            }));
          }
        } else {
          console.log(`No data found for period: ${period}`);
          setState(prevState => ({
            ...prevState,
            series: [],
            options: {
              ...prevState.options,
              labels: []
            }
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setState(prevState => ({
          ...prevState,
          series: [],
          options: {
            ...prevState.options,
            labels: []
          }
        }));
      });
  }, [period]);

  return (
    <div>
      {state.series.length > 0 ? (
        <ReactApexChart 
          options={state.options} 
          series={state.series} 
          type="donut" 
          height={300} 
        />
      ) : (
        <div className='text-black'>Loading chart data...</div>
      )}
    </div>
  );
};
export default DonutChart;
