import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'next-themes';
import "../app/globals.css";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChart = ({ period }) => {
    const { theme } = useTheme();
    const isMobile = useMediaQuery({ maxWidth: 768 });

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
                foreColor: theme === 'dark' ? '#808080' : '#808080'
            },
            plotOptions: {
                bar: {
                    horizontal: isMobile,
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
                        colors: theme === 'dark' ? '#808080' : '#808080',
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
                        color: theme === 'dark' ? '#808080' : '#808080',
                    }
                },
                labels: {
                    style: {
                        colors: theme === 'dark' ? '#808080' : '#808080',
                    }
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                enabled: true,
                theme: theme === 'dark' ? 'dark' : 'light', // Menggunakan tema dinamis
                x: {
                    show: true,
                    formatter: function (val) {
                        return 'Bulan: ' + val;
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
                    fontSize: '10px',
                    fontFamily: 'Arial, sans-serif',
                    colors: '#808080',
                },
                marker: {
                    show: false,
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '12px',
                        colors: ['#808080'],
                    }
                }
            },
        }
    });

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

    useEffect(() => {
        fetch("/data/penjualan.json")
            .then(response => response.json())
            .then((data) => {
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
