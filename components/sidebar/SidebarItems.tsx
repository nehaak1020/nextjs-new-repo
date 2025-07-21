'use client';

import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

interface MenuItemType {
  label: string;
  icon: React.ReactNode;
}

interface SidebarItemsProps {
  menuItems: MenuItemType[];
  open: boolean;
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ menuItems, open }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getPath = (label: string) => {
    if (label === 'Work Orders') return '/'; 
    return `/${label.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const handleClick = (label: string) => {
    const path = getPath(label);
    router.push(path);
  };

  return (
    <>
      {menuItems.map(({ label, icon }) => {
        const path = getPath(label);
        const isActive =
        (label === 'Work Orders' &&
          (pathname === '/' || pathname?.startsWith('/orders/') && pathname?.endsWith('/edit'))) ||
        pathname === path;

        return (
          <Tooltip title={!open ? label : ''} placement="right" key={label}>
            <ListItem disablePadding onClick={() => handleClick(label)}>
              <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  backgroundColor: isActive ? 'lightblue' : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive ? 'lightblue' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                {open && <ListItemText primary={label} />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        );
      })}
    </>
  );
};

export default SidebarItems;
