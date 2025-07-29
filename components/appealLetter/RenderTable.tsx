import React from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell, Checkbox,
  TableContainer, TablePagination
} from '@mui/material';
import ActionMenu from './ActionMenu';
import { Order } from '@/redux/slices/orderSlice';

type Props = {
  rows: Order[];
  selectedRows: number[];
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
  page: number;
  setPage: (p: number) => void;
  rowsPerPage: number;
  totalCount: number;
};

const RenderTable: React.FC<Props> = ({
  rows, selectedRows, setSelectedRows, page, setPage, rowsPerPage, totalCount,
}) => {
  const handleCheckboxChange = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = rows.map((r) => r.id);
    const allSelected = allIds.every((id) => selectedRows.includes(id));
    setSelectedRows(allSelected ? selectedRows.filter((id) => !allIds.includes(id)) : [...new Set([...selectedRows, ...allIds])]);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#dedbdb' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedRows.length === rows.length}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Order Name</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Work Type</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </TableCell>
                <TableCell>{row.orderName}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.workType}</TableCell>
                <TableCell>{row.priority}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <ActionMenu orderId={row.id} />
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </>
  );
};

export default RenderTable;
