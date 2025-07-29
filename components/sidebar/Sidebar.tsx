'use client';

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GavelIcon from '@mui/icons-material/Gavel';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SidebarItems from './SidebarItems';

const drawerWidth = 220;

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon fontSize="small" /> },
    { label: 'Accounts', icon: <AccountCircleIcon fontSize="small" /> },
    { label: 'Batches', icon: <FolderIcon fontSize="small" /> },
    { label: 'Resolution', icon: <EmojiObjectsIcon fontSize="small" /> },
    { label: 'Assessments', icon: <FactCheckIcon fontSize="small" /> },
    { label: 'Reports', icon: <FactCheckIcon fontSize="small" /> },
    { label: 'Appeal Letter', icon: <GavelIcon fontSize="small" /> },
    { label: 'Calendar', icon: <CalendarMonthIcon fontSize="small" /> },
    { label: 'Summary', icon: <SummarizeIcon fontSize="small" /> },
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
          bgcolor: '#2C4D6C',
          borderRadius: '10px',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: open ? 10 : 10,
          // left: 12,
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

      <List sx={{ mt:6 }}>
        <SidebarItems menuItems={menuItems} open={open} />
      </List>

      <Box sx={{ flexGrow: 2, marginTop:'50px' }} />
      <Box sx={{ px: 1.5, mt: 1 }}>
        <ListItem
          sx={{
            color: 'white',
            borderRadius: '6px',
            justifyContent: open ? 'flex-start' : 'center',
            gap: 1.5,
            cursor: 'pointer',
            '&:hover': { bgcolor: '#365C7D' },
            px: open ? 1.5 : 0,
            py: 1,
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.43,
            letterSpacing: '0.01071em',
            padding: '8px 16px',
          }} 
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
              color:'white',
              fontSize:'12px',
              marginRight:0 
            }}
          >
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          {open && <ListItemText sx={{fontSize:'12px'}} primary={'Settings'} />}
        </ListItem>
      </Box>

      <Box sx={{ px: 1.5, pb: 2 }}>
        <ListItem
          sx={{
            bgcolor: '#2AD2A3',
            color: 'white',
            borderRadius: '8px',
            paddingY: '8px',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#28c59a' },
            fontSize: '0.85rem',
          }}
        >
          <LogoutIcon sx={{ fontSize: '18px', mr: 1 }} />
          {open && 'Logout'}
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
