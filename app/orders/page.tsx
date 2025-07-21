'use client';

import { Typography } from '@mui/material';
import ListingPage from '@/components/listingpage/ListingPage';

export default function WorkOrdersPage() {
  return (
    <>
      <Typography variant="h5" mb={2}>
        Work Orders
      </Typography>
      <ListingPage />
    </>
  );
}
