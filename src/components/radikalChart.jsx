"use client";

import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialChart = () => {
  const [chartData] = useState({
    series: [85, 75, 65], // Persentase pencapaian masing-masing produk terlaris
    options: {
      chart: {
        height: 450,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: '50%',
          },
          dataLabels: {
            show: true,
            name: {
              show: true,
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#808080',
              offsetY: 5,
            },
            value: {
              show: true,
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#808080',
            },
          },
        },
      },
      fill: {
        colors: ['#FF5733', '#33FF57', '#3357FF'], // Warna untuk masing-masing produk
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Produk A', 'Produk B', 'Produk C'],
      legend: {
              show: true,
              position: 'bottom',
              horizontalAlign: 'center',
              fontSize: '15px',
              fontWeight: 'thin',
              labels: {
                colors: '#808080',
              },
              markers: {
                size: 6
              },
              itemMargin: {
                horizontal: 10,
            
              },
              offsetY: -10,
            },
      
    },
  });

  return (
    <div className="radial-chart ">
      <h3 className='mb-2 text-gray-500'>Produk Terlaris Sepanjang Tahun</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={350}
      />
    </div>
  );


};export default RadialChart;