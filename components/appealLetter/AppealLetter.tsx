'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders } from '@/redux/actions/orderActions';
import { RootState, AppDispatch } from '@/redux/store';
import Toolbar from './Toolbar';
import RenderTable from './RenderTable';
import ExportDialog from './Export';

const exportToCsv = (data: any[], filename: string) => {
  const headers = ['Order Name', 'Customer Name', 'Description', 'Work Type', 'Priority'];
  const rows = data.map(order => [
    order.orderName,
    order.customerName,
    order.description,
    order.workType,
    order.priority,
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
  URL.revokeObjectURL(url);
};

const downloadLettersAsHtml = (data: any[], filename: string) => {
  const htmlContent = data
    .map((order) => `
      <div style="margin-bottom: 20px;">
        <h2>Letter for ${order.customerName}</h2>
        <p><strong>Description:</strong> ${order.description}</p>
        <p><strong>Order Name:</strong> ${order.orderName}</p>
        <p><strong>Work Type:</strong> ${order.workType}</p>
        <p><strong>Priority:</strong> ${order.priority}</p>
        <hr/>
      </div>
    `)
    .join('');

  const blob = new Blob(
    [`<html><body>${htmlContent}</body></html>`],
    { type: 'text/html' }
  );
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

const AppealLetter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      await dispatch(loadOrders() as any);
      setIsLoading(false);
    };
    fetchOrders();
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    const lower = searchQuery.toLowerCase();
    return orders.filter((order) =>
      [order.orderName, order.customerName, order.description, order.workType, order.priority]
        .some((field) => field.toLowerCase().includes(lower))
    );
  }, [orders, searchQuery]);

  const paginatedOrders = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredOrders.slice(start, start + rowsPerPage);
  }, [filteredOrders, page]);

 
  const handleExport = () => {
  const selectedData = orders.filter((o) => selectedRows.includes(o.id));
  exportToCsv(selectedData, 'grid-details.csv');
};

const handleDownload = () => {
  const selectedData = orders.filter((o) => selectedRows.includes(o.id));
  downloadLettersAsHtml(selectedData, 'letters.html');

};

  return (
    <Box >
      <Toolbar
        selectedRows={selectedRows}
        onExport={() => setExportDialogOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Paper elevation={2}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <RenderTable
            rows={paginatedOrders}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            totalCount={filteredOrders.length}
          />
        )}
      </Paper>

      <ExportDialog
        open={exportDialogOpen}
        selectedCount={selectedRows.length}
        onClose={() => setExportDialogOpen(false)}
        onExport={handleExport}
        onDownload={handleDownload}
      />
    </Box>
  );
};

export default AppealLetter;
