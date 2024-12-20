'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { fetchProduk, hapusProduk, updateProduk } from '@/helpers/fetchProduk';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const KomponenBerat = dynamic(() => import('../components/heavyComponent'), {
  ssr: false,
  loading: () => <p>Sedang Loading bang</p>
});

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

  const classes = useStyles();

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProduk();
      setRows(data);
    };

    fetchData();
  }, []);

  const handleEdit = (row) => {
    console.log('Edit row:', row);
  }

  const handleDelete = async (id) => {
    try {
      await hapusProdukProduk(id);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

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
      headerName: 'Action',
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
      <div className="w-full">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          pagination
          style={{ width: '100%' }}
          checkboxSelection
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#DDDDDD', // Match the header background color
            },
            '& .MuiDataGrid-columnHeaderCheckbox': {
              backgroundColor: '#DDDDDD', // Match the header background color
            },
          }}
          initialState={{
            pinnedColumns: {
              left: ['checkbox'],
            },
          }}
        />
      </div>
      <KomponenBerat />
    </div>
  );
};

export default DataGridWithFirebase;
