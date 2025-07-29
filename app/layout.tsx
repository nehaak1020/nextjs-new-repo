'use client';

import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/sidebar/Sidebar';
import { Providers } from '@/redux/provider';
import Topbar from '@/components/topbar/Topbar';
import styles from './page.module.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body_content}>
        <Providers>
          <Topbar/>
          <Box display="flex" className="main_content" sx={{marginTop: '10px'}}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', marginLeft:'10px' }}>
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
