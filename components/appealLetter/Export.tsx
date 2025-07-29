'use client';
import React from 'react';
import { Box, Typography, Button, IconButton, Stack, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';

interface ExportDialogProps {
  open: boolean;
  selectedCount: number;
  onClose: () => void;
  onExport: () => void;
  onDownload: () => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({
  open,
  selectedCount,
  onClose,
  onExport,
  onDownload
}) => {
  if (!open) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '12px',
        backgroundColor: '#EDF6FD',
        px: 3,
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 2,
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} color="#1C2D5A">
        {selectedCount} Order Letter selected
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={onExport}
          sx={{
            borderRadius: '10px',
            borderColor: '#2BB4A8',
            color: '#2BB4A8',
            textTransform: 'none',
            fontWeight: 600,
            px: 2.5,
            '&:hover': {
              borderColor: '#2BB4A8',
              backgroundColor: 'rgba(43, 180, 168, 0.1)',
            },
          }}
        >
          Export Grid Details
        </Button>

        <Button
          variant="outlined"
          onClick={onDownload}
          sx={{
            borderRadius: '10px',
            borderColor: '#2BB4A8',
            color: '#2BB4A8',
            textTransform: 'none',
            fontWeight: 600,
            px: 2.5,
            '&:hover': {
              borderColor: '#2BB4A8',
              backgroundColor: 'rgba(43, 180, 168, 0.1)',
            },
          }}
        >
          Download Letter
        </Button>

        <IconButton onClick={onClose} size="small">
          <CloseIcon sx={{ color: '#1C2D5A' }} />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default ExportDialog;
