'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import "../app/globals.css";

// Dynamic import untuk ReactApexChart agar hanya di-render di client-side
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChart = ({ period }) => {
    const chartRef = useRef(null);
    const [state, setState] = useState({
        series: [
            {
                name: 'Penjualan',
                data: []
            }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                padding: {
                    right: 20,
                    left: 20,
                },
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                    },
                },
                redrawOnWindowResize: true,
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 300
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '35%',
                    borderRadius: 5,
                    //   borderRadiusApplication: 'all',
                    //   borderRadiusWhenStacked: 'all',
                    barHeight: '70%',
                    distributed: false,
                    padding: {
                        left: 15,
                        right: 15
                    },
                    roundedCorners: {
                        top: true,
                        bottom: true,
                    },
                    states: {
                        hover: {
                            enable: true,
                            color: "#f5b041",
                        },
                    }
                }
            },
            grid: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 0,
                colors: ['green']
            },
            xaxis: {
                categories: [],
                label: {
                    style: {
                        colors: 'gray',

                    }
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false
                },
            },

            yaxis: {
                title: {
                    text: 'Rp (pendapatan)',
                    style: {
                        color: 'black',
                    }
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                enabled: true, // Mengaktifkan tooltip
                theme: 'light', // Mengubah tema tooltip (dark/light)
                x: {
                    show: true, // Menampilkan label X saat hover
                    formatter: function (val) {
                        return 'Bulan: ' + val; // Mengubah format label X (bulan)
                    }
                },
                y: {
                    formatter: function (val) {
                        return "Rp " + val.toLocaleString();
                    }
                },
                title: {
                    formatter: () => ''
                },
                style: {
                    fontSize: '14px', // Mengatur ukuran font tooltip
                    fontFamily: 'Arial, sans-serif', // Mengatur jenis font tooltip
                    colors: '#000000', // Mengatur warna teks tooltip
                },
                marker: {
                    show: false,
                }
            },
        }
    }
    );

    useEffect(() => {
        fetch("/data/penjualan.json")
            .then(response => response.json())
            .then((data) => {
                // Get the most recent year's data (2024)
                const currentYearData = data[period];

                setState((prevState) => ({
                    ...prevState,
                    series: [
                        {
                            name: 'Penjualan',
                            data: currentYearData.penjualan
                        }
                    ],
                    options: {
                        ...prevState.options,
                        xaxis: {
                            ...prevState.options.xaxis,
                            categories: currentYearData.bulan
                        }
                    }
                }));
            })
            .catch((error) => {
                console.error("Error fetching data", error);
            });
    }, [period]);
    
    return (
        <div className="w-full h-full transition-all duration-300">
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={200}
                width="100%"
            />
        </div>
    );
}; export default BarChart;
