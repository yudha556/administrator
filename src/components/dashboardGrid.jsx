'use client';

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { fetchProduk } from '@/helpers/fetchProduk';
import "@/app/globals.css";

const useStyles = makeStyles({
  headerStyle: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: 'gray',
    paddingLeft: '16px',
    textAlign: 'center',

  },
  cellStyle: {
    color: 'gray',
    padding: '16px',
  }
});

const DataGridWithFirebase = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProduk();
      setRows(data);
      setFilteredRows(data);
    };

    fetchData();
  }, []);


  const columns = [
    {
      field: 'nama',
      headerName: 'Nama',
      flex: 1,
      minWidth: 80,
      headerClassName: classes.headerStyle,
      cellClassName: classes.cellStyle,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: 'tanggal',
      headerName: 'Tanggal',
      flex: 1,
      minWidth: 100,
      headerClassName: classes.headerStyle,
      cellClassName: classes.cellStyle,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: 'stok',
      headerName: 'Stok',
      flex: 1,
      minWidth: 80,
      headerClassName: classes.headerStyle,
      cellClassName: classes.cellStyle,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: 'harga',
      headerName: 'Harga',
      flex: 1,
      minWidth: 80,
      headerClassName: classes.headerStyle,
      cellClassName: classes.cellStyle,
      disableColumnMenu: true,
      disableColumnSort: true,
    },
    {
      field: 'kategori',
      headerName: 'Kategori',
      flex: 1,
      minWidth: 90,
      headerClassName: classes.headerStyle,
      cellClassName: classes.cellStyle,
      disableColumnMenu: true,
      disableColumnSort: true,
    }
  ];

  return (
    <div className='w-full border-none rounded-2xl  bg-gray-darkx dark:bg-white '>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        rowHeight={60}
        pagination
        style={{ width: '100%', height: 420, }}
        pageSizeOptions={[10, 100, { value: 1000, label: '1,000' }, { value: -1, label: 'All' }]}
        autoHeith={true}
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell': {
            padding: '0px 0',
            textAlign: 'left',
            marginLeft: '0px',
            paddingLeft: '32px',
          },
          '& .MuiDataGrid-row': {
            marginBottom: '0px',
            marginTop: '0px',
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            border: 'none',
            textAlign: 'center',
            transform: 'translateX(20px)',
            background: 'none',
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
          }
        }}
      />
    </div>
  );
};
export default DataGridWithFirebase;
