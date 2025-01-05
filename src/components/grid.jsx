'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { fetchProduk, hapusProduk, updateProduk, addProduk } from '@/helpers/fetchProduk';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


// styling coba coba ada yang jadi ada yang ngga
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
  const [selectedRows, setSelectedRows] = useState([]);

  const classes = useStyles(); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProduk();
      setRows(data);
      setFilteredRows(data);
    };

    fetchData();
  }, []);

  // buat edit produk
  const handleEdit = async (row) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Edit Produk",
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Nama Produk" value="${row.nama}" />
          <input id="swal-input2" class="swal2-input" placeholder="Kategori Produk" value="${row.kategori}" />
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Simpan",
        confirmButtonText: 'Simpan',
        confirmButtonColor: '#0D92F4',
        cancelButtonColor: '#A5BFCC',
        background: '#f0f8ff',
        preConfirm: () => {
          const newName = document.getElementById("swal-input1").value.trim();
          const newKategori = document.getElementById("swal-input2").value.trim();
          if (!newName || !newKategori) {
            Swal.showValidationMessage("Semua kolom wajib diisi!");
          }
          return { newName, newKategori };
        },
      });

      if (formValues) {
        const { newName, newKategori } = formValues;

        const updatedRow = {
          ...row,
          nama: newName,
          kategori: newKategori,
        };

        await updateProduk(row.id, updatedRow);

        setRows((prevRows) => {
          const updatedRows = prevRows.map((item) =>
            item.id === row.id ? { ...item, nama: newName, kategori: newKategori } : item
          );
          setFilteredRows(updatedRows);
          return updatedRows;
        });

        Swal.fire({
          icon: "success",
          title: "Produk berhasil diperbarui!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan!",
        text: "Tidak dapat memperbarui produk.",
      });
    }
  };

  // Buat Hapus Produk
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi Hapus',
        text: 'Apakah Anda yakin ingin menghapus produk ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      });
  
      if (result.isConfirmed) {
        await hapusProduk(id);
  
        setRows((prevRows) => {
          const updatedRows = prevRows.filter((row) => row.id !== id);
          setFilteredRows(updatedRows);
          return updatedRows;
        });
  
        Swal.fire(
          'Terhapus!',
          'Produk berhasil dihapus.',
          'success'
        );
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: 'Gagal menghapus produk.'
      });
    }
  };
  
  // Mesin Pencarian Bang
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filteredData = rows.filter((row) =>
      row.nama.toLowerCase().includes(searchValue) ||
      row.kategori.toLowerCase().includes(searchValue)
    );
    setFilteredRows(filteredData);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const handleBulkDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi Hapus',
        text: `Apakah Anda yakin ingin menghapus ${selectedRows.length} produk yang dipilih?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      });

      if (result.isConfirmed) {
        await Promise.all(selectedRows.map(id => hapusProduk(id)));

        setRows(prevRows => {
          const updatedRows = prevRows.filter(row => !selectedRows.includes(row.id));
          setFilteredRows(updatedRows);
          return updatedRows;
        });

        setSelectedRows([]);

        Swal.fire(
          'Terhapus!',
          'Produk berhasil dihapus.',
          'success'
        );
      }
    } catch (error) {
      console.error("Error deleting products:", error);
      Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: 'Gagal menghapus produk.'
      });
    }
  };

  

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
        <div className='text-primary-text-dark '>
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
    <div className=''>
      <div className="w-full flex flex-col gap-3 items-center justify-center">
        
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchText}
          onChange={handleSearchChange}
          className="w-full mt-7 hover:border-black p-2 border border-dark-bg bg-gray-dark dark:bg-primary-bg rounded-sm flex mb-4 max-w-screen-lg"
        />

        <div className='w-full border-none bg-gray-dark dark:bg-primary-bg'>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            onRowSelectionModelChange={handleSelectionChange}
            rowSelectionModel={selectedRows}
            checkboxSelection
            disableRowSelectionOnClick
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowHeight={80}
            pagination
            style={{ width: '100%', height: 520 }}
            pageSizeOptions={[10, 100, { value: 1000, label: '1,000' }, { value: -1, label: 'All' }]}
            autoHeith={true}
            isRowSelectable={(params) => true}
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

