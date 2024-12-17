'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import "../app/globals.css";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChart = ({ period }) => {
   
    // buat tampilan mobile si bar akan miring
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // tipe md breakpoint
        };
        
        handleResize();
        
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // ini buat styling si barChart dari apexChart
    const [state, setState] = useState({
        series: [{
            name: 'Penjualan',
            data: []
        }],
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
                    horizontal: isMobile, // buat tampilan mobile si bar akan miring
                    columnWidth: '35%',
                    borderRadius: 5,
                    barHeight: '70%',
                    distributed: false,
                    padding: {
                        left: 15,
                        right: 15
                    },
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
                    fontSize: '10px', // Mengatur ukuran font tooltip
                    fontFamily: 'Arial, sans-serif', // Mengatur jenis font tooltip
                    colors: '#000000', // Mengatur warna teks tooltip
                },
                marker: {
                    show: false,
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '12px',
                        colors: ['#000000'],
                    }
                }
            },
        }
    });

    // ini buat ngecek kalo ada perubahan di state state.options.plotOptions.bar.horizontal
    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            options: {
                ...prevState.options,
                plotOptions: {
                    ...prevState.options.plotOptions,
                    bar: {
                        ...prevState.options.plotOptions.bar,
                        horizontal: isMobile
                    }
                }
            }
        }));
    }, [isMobile]);

    // ini buat ngecek kalo ada perubahan di state state.options.xaxis.categories
    useEffect(() => {
        fetch("/data/penjualan.json")
            .then(response => response.json())
            .then((data) => {
                // ambil data otomatis dari 2024 ketika baru dibuka
                const currentYearData = data[period];

                // kurang tau ini pokoknya dari dokumentasi barChart harus gini biar bisa ambil data dari json
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
        <div className="h-full transition-all duration-400">
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={isMobile ? 350 : 200}
                width="95%"
            />
        </div>
    );
};

export default BarChart;
