'use client';

import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/sidebar/Sidebar';
import { Providers } from '@/redux/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box display="flex">
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
