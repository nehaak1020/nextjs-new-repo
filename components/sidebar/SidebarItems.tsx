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
import styles from '../../app/page.module.css';

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
    if (label === 'Appeal Letter') return '/'; 
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
        (label === 'Appeal Letter' &&
          (pathname === '/' || pathname?.startsWith('/orders/') && pathname?.endsWith('/edit'))) ||
        pathname === path;

        return (
          <Tooltip title={!open ? label : ''} placement="right" key={label}>
            <ListItem disablePadding onClick={() => handleClick(label)} sx={{paddingLeft: '10px', paddingRight:'10px'}} className={styles.list_item}>
              <ListItemButton
                 sx={{
                  justifyContent: open ? 'initial' : 'center',
                  backgroundColor: isActive ? '#57718A' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive ? '#57718A' : '#57718A',
                    },
                    color:'white',
                    borderRadius: '4px',
                  }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color:'white',
                    fontSize:'12px'
                  }}
                >
                  {icon}
                </ListItemIcon>
                {open && <ListItemText sx={{fontSize:'12px'}} primary={label} />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        );
      })}
    </>
  );
};

export default SidebarItems;
