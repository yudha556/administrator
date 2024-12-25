'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { fetchProduk, hapusProduk, updateProduk } from '@/helpers/fetchProduk';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles({
  headerStyle: {
    backgroundColor: '#DDDDDD',
    fontWeight: 'bold',
    color: '#333',
  },
  cellStyle: {
    color: '#333',
  },
  checkBoxStyle: {
    color: '#333',
    width: '100%',
    border: '1px solid #ccc',
    transform: 'scale(2)',
  }
});

const DataGridWithFirebase = () => {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  const classes = useStyles();

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProduk();
      setRows(data);
      setFilteredRows(data);
    };

    fetchData();
  }, []);

  const handleEdit = (row) => {
    console.log('Edit row:', row);
    // Implementasi logika edit produk
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
    if (confirmDelete) {
      try {
        await hapusProduk(id); // Memanggil fungsi hapus dari API/helper
        setRows((prevRows) => prevRows.filter((row) => row.id !== id)); // Menghapus produk dari state setelah berhasil
        alert("Produk berhasil dihapus.");
      } catch (error) {
        console.error('Error deleting data:', error);
        alert("Terjadi kesalahan saat menghapus produk.");
      }
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    // Filter baris berdasarkan input pencarian
    const filteredData = rows.filter((row) =>
      row.nama.toLowerCase().includes(searchValue) ||
      row.kategori.toLowerCase().includes(searchValue)
    );
    setFilteredRows(filteredData);
  };

  // Define columns
  const columns = [
    {
      field: 'nama',
      headerName: 'Nama',
      flex: 1,
      minWidth: 150,
      headerClassName: classes.headerStyle,
      cellClassName: classes.cellStyle,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: 'tanggal',
      headerName: 'Tanggal',
      flex: 1,
      minWidth: 110,
      headerClassName: classes.headerStyle,
      cellClassName: classes.cellStyle,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: 'stok',
      headerName: 'Stok',
      flex: 1,
      minWidth: 110,
      headerClassName: classes.headerStyle,
      cellClassName: classes.cellStyle,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: 'harga',
      headerName: 'Harga',
      flex: 1,
      minWidth: 110,
      headerClassName: classes.headerStyle,
      cellClassName: classes.cellStyle,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: 'kategori',
      headerName: 'Kategori',
      flex: 1,
      minWidth: 150,
      headerClassName: classes.headerStyle,
      cellClassName: classes.cellStyle,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: 'action',
      headerName: '',
      flex: 1,
      minWidth: 110,
      headerClassName: classes.headerStyle,
      cellClassName: classes.cellStyle,
      disableColumnMenu: true,
      disableColumnSort: true,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    }
  ];

  return (
    <div>
      <div className="w-full  flex flex-col gap-3 items-center justify-center">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchText}
          onChange={handleSearchChange} // Menggunakan handleSearchChange di sini
          className="w-full mt-7 hover:border-black p-2 border border-gray-300 rounded-sm flex mb-4 max-w-screen-lg"
        />
        <div className='w-full border-none'>
          <DataGrid
            rows={filteredRows} // Gunakan filteredRows, karena itu yang sudah difilter
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowHeight={80}
            pagination
            style={{ width: '100%', height: 520  }}
            pageSizeOptions={[10, 100, { value: 1000, label: '1,000' }, { value: -1, label: 'All' }]}
            autoHeith={true}
            checkboxSelection
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#DDDDDD',
              },
              '& .MuiDataGrid-columnHeaderCheckbox': {
                backgroundColor: '#DDDDDD',
              },
              '& .MuiDataGrid-cell': {
                border: 'none',
                padding: '0px 0',
              },
              '& .MuiDataGrid-row': {
                marginBottom: '0px',
                marginTop: '0px',
              },
              '& .MuiDataGrid-columnHeaders': {
                border: 'none',
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
              '& .MuiDataGrid-main': {
                border: 'none',
              },
              '& .MuiDataGrid-virtualScroller': {
                border: 'none',
              },
              '& .MuiDataGrid-footerContainer': {
                border: 'none',
                justifyContent: 'flex-end',
                borderBottom: 'none',
              },
              '& .MuiTablePagination-root': {
                borderTop: 'none', 
              }
            }}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
              pinnedColumns: {
                left: ['checkbox'],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DataGridWithFirebase;
