'use client';

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
} from '@mui/material';

import {
  Dashboard as DashboardIcon,
  TableChart as TableIcon,
  Logout as LogoutIcon,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SidebarItems from './SidebarItems';

const drawerWidth = 220;

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon /> },
    { label: 'Daily Visit', icon: <AssessmentIcon /> },
    { label: 'Reports', icon: <DescriptionIcon /> },
    { label: 'Reports History', icon: <SummarizeIcon /> },
    { label: 'Test History', icon: <SummarizeIcon /> },
    { label: 'Work Orders', icon: <TableIcon /> },
    { label: 'Calendar', icon: <CalendarMonthIcon /> },
    { label: 'Logout', icon: <LogoutIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 60,
          transition: 'width 0.3s',
          overflowX: 'hidden',
          boxSizing: 'border-box',
          position: 'relative',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          // right: open ? -15 : -15,,
          left: 12,
          bgcolor: 'white',
          border: '1px solid #ccc',
          borderRadius: '50%',
          width: 30,
          height: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          cursor: 'pointer',
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronLeft fontSize="small" /> : <ChevronRight fontSize="small" />}
      </Box>

      <List sx={{ mt: 8 }}>
        <SidebarItems menuItems={menuItems} open={open}/>
      </List>
    </Drawer>
  );
};

export default Sidebar;
