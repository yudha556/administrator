"use client";

import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const StatistikPage = () => {
    const [state, setState] = useState({
        series: [
            {
                name: 'Keuntungan 2024',
                data: [] // Data keuntungan 2024 akan diambil dari JSON
            },
            {
                name: 'Keuntungan 2023',
                data: [] // Data keuntungan 2023 akan diambil dari JSON
            }
        ],
        options: {
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false
                    }
                },
                redrawOnWindowResize: true,
                redrawOnParentResize: true
            },
            responsive: [{
                breakpoint: 768,
                options: {
                    chart: {
                        height: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }, {
                breakpoint: 480,
                options: {
                    chart: {
                        height: 250
                    },
                    legend: {
                        position: 'bottom'
                    },
                    xaxis: {
                        labels: {
                            rotate: -45,
                            maxHeight: 60
                        }
                    }
                }
            }],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 5
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0.9,
                    opacityFrom: 0.7,
                    opacityTo: 0.2,
                    stops: [0, 100]
                }
            },
            xaxis: {
                categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                lines: {
                    show: true
                },
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                },
                axisBorder: {
                    show: true 
                },
                axisTicks: {
                    show: false
                }
            },
            tooltip: {
                y: {
                    formatter: function (value) {
                        return "Rp " + value.toLocaleString('id-ID');
                    }
                }
            },
            grid: {
                show: false
            },
            legend: {
                position: 'top',
                horizontalAlign: 'center'
            }
        }
    });

    const [selectedYear1, setSelectedYear1] = useState("2024");
    const [selectedYear2, setSelectedYear2] = useState("2023");

    const handleYearChange = (e) => {
        const year = e.target.value;
        if (selectedYear1 === year) {
            setSelectedYear2(year);
        } else {
            setSelectedYear1(year);
        }
    };

    useEffect(() => {
        fetch("/data/keuntungan.json")
            .then(response => response.json())
            .then(data => {
                if (data && data[selectedYear1] && data[selectedYear2]) {
                    const keuntunganData1 = data[selectedYear1].keuntungan;
                    const keuntunganData2 = data[selectedYear2].keuntungan;

                    setState(prevState => ({
                        ...prevState,
                        series: [
                            {
                                name: `Keuntungan ${selectedYear1}`,
                                data: keuntunganData1
                            },
                            {
                                name: `Keuntungan ${selectedYear2}`,
                                data: keuntunganData2
                            }
                        ]
                    }));
                } else {
                    console.error("Data tidak valid atau tidak lengkap.");
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [selectedYear1, selectedYear2]);

    return (
        <div className="w-full">
            <div className="mb-4 flex flex-col sm:flex-row items-center gap-2 p-6">
                <div className="flex items-center">
                    <label className="mr-2 whitespace-nowrap">Pilih Tahun 1:</label>
                    <select value={selectedYear1} onChange={handleYearChange} className='text-primary-text rounded-sm text-sm w-full sm:w-auto'>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>
                </div>

                <div className="flex items-center">
                    <label className="mr-2 whitespace-nowrap">Pilih Tahun 2:</label>
                    <select value={selectedYear2} onChange={handleYearChange} className='text-primary-text rounded-sm text-sm w-full sm:w-auto'>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>
                </div>
            </div>
            
            <div id="chart" className="w-full">
                <ReactApexChart options={state.options} series={state.series} type="area" height={350} width="100%" />
            </div>
        </div>
    );
}
export default StatistikPage;
