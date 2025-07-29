import React from 'react';
import {
  Stack,
  TextField,
  Button,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

type Props = {
  selectedRows: number[];
  onExport: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const Toolbar: React.FC<Props> = ({
  selectedRows,
  onExport,
  searchQuery,
  onSearchChange,
}) => (
  <Stack direction="row" justifyContent="flex-end" mb={2}>
    <TextField
      placeholder="Search orders..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      sx={{
        width: 300,
        '& .MuiOutlinedInput-root': {
          borderRadius: '30px',
          backgroundColor: '#fff',
          height: 40,
          boxShadow: 1,
        },
      }}
    />
    <Stack direction="row" spacing={2}>
      {selectedRows.length > 0 && (
        <>
          <Button onClick={onExport} startIcon={<FileUploadIcon />}>
            Export
          </Button>
        </>
      )}
    </Stack>
  </Stack>
);

export default Toolbar;
