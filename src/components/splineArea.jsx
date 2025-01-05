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
                    show: true,  // Pastikan toolbar terlihat
                    tools: {
                        download: true, // Menampilkan hanya tombol download
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false
                    }
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 5
            },
            fill: {
                opacity: 1,  // Transparansi bayangan yang lebih pekat (0.3 untuk lebih terang)
                type: 'gradient',  // Gunakan tipe solid untuk area bawah garis
                gradient: {
                    shadeIntensity: 0.9, // Intensitas bayangan
                    opacityFrom: 0.7, // Opacity untuk bagian bawah grafik
                    opacityTo: 0.2, // Opacity untuk bagian atas grafik
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
                show: false  // Menghilangkan garis grid
            },
            legend: {
                position: 'top',  // Menampilkan legenda di bagian atas
                horizontalAlign: 'center'  // Menyelaraskan legenda secara horizontal
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
        // Fetch data from JSON file
        fetch("/data/keuntungan.json")
            .then(response => response.json())
            .then(data => {
                // Cek apakah data dan tahun yang dipilih ada
                if (data && data[selectedYear1] && data[selectedYear2]) {
                    const keuntunganData1 = data[selectedYear1].keuntungan;
                    const keuntunganData2 = data[selectedYear2].keuntungan;

                    // Update chart with new data for the selected years
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
    }, [selectedYear1, selectedYear2]); // Re-fetch data whenever year selection changes

    return (
        <div>
            <div className="mb-4">
                <label className="mr-2">Pilih Tahun 1:</label>
                <select value={selectedYear1} onChange={handleYearChange} className='text-primary-text rounded-sm text-sm'>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>

                <label className="ml-4 mr-2">Pilih Tahun 2:</label>
                <select value={selectedYear2} onChange={handleYearChange} className='text-primary-text rounded-sm text-sm'>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>
            </div>
            
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
            </div>
        </div>
    );
}

export default StatistikPage;
