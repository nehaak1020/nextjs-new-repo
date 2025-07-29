'use client';

import AppealLetter from '@/components/appealLetter/AppealLetter';
import { Box, Typography } from '@mui/material';

export default function AppealLetterPage() {
  return (
    <>
    <Box sx={{ mx: 'auto', padding: '39px 16px'}}>
      <Typography variant="h5" mb={2}>
        Appeal Letter
      </Typography>
      <AppealLetter />
    </Box>
    </>
  );
}
