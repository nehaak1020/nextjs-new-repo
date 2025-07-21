'use client';
import React, { useEffect, useState, useCallback, useMemo, useRef  } from 'react';
import {
  Box, Button, Typography, Stack, CircularProgress, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders, deleteOrdersAction } from '@/redux/actions/orderActions';
import ActionMenu from './ActionMenu';
import { Order } from '@/redux/slices/orderSlice';
import type { RootState, AppDispatch } from '@/redux/store';
import Create from './createorders/Create';
import styles from './ListingPage.module.css';
import { useTheme } from '@mui/material/styles';

const triggerDataGridResize = () => {
  window.dispatchEvent(new Event('resize'));
};

const ListingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set(),
  });
  const [isLoading, setIsLoading] = useState(true); 
  const [searchQuery, setSearchQuery] = useState('');
  const [gridKey, setGridKey] = useState(0); 
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
useEffect(() => {
  let resizeTimeout: NodeJS.Timeout;

  const observer = new ResizeObserver(() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      triggerDataGridResize();       
      setGridKey((prev) => prev + 1);  
    }, 350); 
  });

  if (gridContainerRef.current) {
    observer.observe(gridContainerRef.current);
  }

  return () => {
    observer.disconnect();
    clearTimeout(resizeTimeout);
  };
}, []);



  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      await dispatch(loadOrders() as any);
      setIsLoading(false);
    };
    fetchOrders();
  }, [dispatch]);

  const handleDeleteSelected = useCallback(async () => {
  const selectedIds = Array.from(selectedRows.ids).filter(
    (id): id is number => typeof id === 'number'
  );
  if (selectedIds.length > 0) {
    setIsLoading(true);
    await dispatch(deleteOrdersAction(selectedIds));
    setSelectedRows({ type: 'include', ids: new Set() });
    setIsLoading(false);
  }
}, [dispatch, selectedRows]);


  const columns: GridColDef[] = [
    { field: 'orderName', headerName: 'Order Name', flex: 1 },
    { field: 'customerName', headerName: 'Customer Name', flex: 1 },
    { field: 'workType', headerName: 'Work Type', flex: 1 },
    { field: 'priority', headerName: 'Priority', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'dueDate', headerName: 'Due Date', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      disableColumnMenu: true,
      filterable: false,
      renderCell: (params) => <ActionMenu orderId={params.row.id} />,
      width: 100,
    },
  ];

  const filteredOrders = useMemo(() => {
  const lowerQuery = searchQuery.toLowerCase();
  return orders.filter((order) => {
    return (
      order.orderName.toLowerCase().includes(lowerQuery) ||
      order.customerName.toLowerCase().includes(lowerQuery) ||
      order.workType.toLowerCase().includes(lowerQuery) ||
      order.priority.toLowerCase().includes(lowerQuery) ||
      order.description.toLowerCase().includes(lowerQuery)
    );
  });
}, [orders, searchQuery]);


  return (
    <Box
  className={styles.gridContainer}
  ref={gridContainerRef}
>
  <Stack direction="row" justifyContent="space-between" mb={2}>
    <Typography variant="h6">Orders List</Typography>
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        variant="outlined"
        placeholder="Search orders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          sx: {
            borderRadius: '30px',
            backgroundColor: '#fff',
            paddingRight: '10px',
            height: '40px',
            boxShadow: 1,
          },
        }}
        sx={{ width: '300px' }}
      />
      {selectedRows.ids.size > 0 && (
        <Button onClick={handleDeleteSelected} startIcon={<DeleteIcon />}>
          Delete
        </Button>
      )}
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Create
      </Button>
    </Stack>
  </Stack>

  <Box className={styles.dataGridWrapper}>
    {isLoading ? (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    ) : (
      <DataGrid
        className={styles.fullWidthGrid}
        key={gridKey}
        rows={filteredOrders}
        columns={columns}
        getRowId={(row: Order) => row.id}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(selection: GridRowSelectionModel) => {
          setSelectedRows(selection);
        }}
        getRowClassName={(params) => {
          const selectedIds = Array.from(selectedRows?.ids ?? []);
          return selectedIds.includes(params.id) ? styles.selectedRow : '';
        }}
        rowSelectionModel={selectedRows}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        localeText={{ noRowsLabel: 'No orders found' }}
        sx={{
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#dedbdb',
          },
        }}
      />
    )}
  </Box>

  <Create
    open={openModal}
    onClose={() => setOpenModal(false)}
    setParentLoading={setIsLoading}
  />
</Box>

  );
};

export default ListingPage;
