"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import "../app/globals.css";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const isBrowser = typeof window !== 'undefined';
const BarChart = ({ period }) => {
    // tema
    const [theme, setTheme] = useState('light');
   
    // buat tampilan mobile si bar akan miring
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (isBrowser) {
            const handleResize = () => {
                setIsMobile(window.innerWidth < 768); // tipe md breakpoint
            };
            
            handleResize();
            
            window.addEventListener('resize', handleResize);
            
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        if (isBrowser) {
            const detectTheme = () => {
                const htmlElement = document.documentElement;
                if (htmlElement.classList.contains('dark')) {
                    setTheme('dark');
                } else {
                    setTheme('light');
                }
            };

            detectTheme(); // cek tema pas loadng
            window.addEventListener('storage', detectTheme); // cek tema pas reload

            return () => {
                window.removeEventListener('storage', detectTheme);
            };
        }
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
                },
                foreColor: theme === 'dark' ? '#808080' : '#808080' // Mengubah warna teks menjadi abu-abu
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
                labels: {
                    style: {
                        colors: theme === 'dark' ? '#808080' : '#808080', // Mengubah warna teks menjadi abu-abu
                    }
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                title: {
                    text: 'Rp (pendapatan)',
                    style: {
                        color: theme === 'dark' ? '#808080' : '#808080', // Mengubah warna teks menjadi abu-abu
                    }
                },
                labels: {
                    style: {
                        colors: theme === 'dark' ? '#808080' : '#808080', // Mengubah warna teks menjadi abu-abu
                    }
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                enabled: true, // Mengaktifkan tooltip
                theme: 'dark', // Mengubah tema tooltip (dark/light)
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
                    colors: '#808080', // Mengubah warna teks menjadi abu-abu
                },
                marker: {
                    show: false,
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '12px',
                        colors: ['#808080'], // Mengubah warna teks menjadi abu-abu
                    }
                }
            },
        }
    });

    // ini buat ngecek kalo ada perubahan di state state.options.plotOptions.bar.horizontal
    useEffect(() => {
        if (isBrowser) {
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
        }
    }, [isMobile]);

    // ini buat ngecek kalo ada perubahan di state state.options.xaxis.categories
    useEffect(() => {
        if (isBrowser) {
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
        }
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