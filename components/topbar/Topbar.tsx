'use client';
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Typography,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppsIcon from '@mui/icons-material/Apps';
import Image from 'next/image';
import { useState } from 'react';

const Topbar = () => {
  const [workspace, setWorkspace] = useState('cw');

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ background: '#FFFFFF', borderBottom: '1px solid #E0E0E0', borderRadius: '10px' }}
    >
      <Toolbar sx={{ minHeight: 62, px: 3 }}>
        {/* Left side */}
        <Box display="flex" alignItems="center" justifyContent={'space-between'} gap={2} sx={{width:'100%'}}>
          {/* Your original logo */}
          <Box >
            <Image src="/images/tax.png" alt="Main Logo" width={160} height={40} />
          </Box>

          <Box sx={{width:"100%", gap:'50px'}} display="flex" alignItems="center" justifyContent={'flex-end'} >
            <Box display={'flex'} alignItems={'center'} sx={{gap:'10px'}}>
              {/* Client Workspace label and select */}
            <Typography fontWeight={600} sx={{color:"black"}} fontSize={'13px'}>
              Client Workspace:
            </Typography>
            <Select
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              size="small"
              sx={{
                backgroundColor: '#fff',
                px: 1.5,
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                },
              }}
            >
              <MenuItem value="cw">
                <Box display="flex" alignItems="center" gap={1}>
                  <Image
                  src="/images/small-img.png"
                  alt="CW Logo"
                  width={24}
                  height={24}
                />
                </Box>
              </MenuItem>
            </Select>
            </Box>

            {/* Search bar (centered-ish) */}
            <TextField
              size="small"
              placeholder="Search"
              sx={{ width: '450px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* Right side icons */}
            <Box display="flex" alignItems="center" gap={2}>
              {/* CW logo on right */}
              <Image src="/images/big-image.png" alt="CW Logo Right" width={32} height={32} />

              {/* Avatar */}
              <Avatar sx={{ bgcolor: '#3A8DFF', width: 32, height: 32, fontSize: 14 }}>
                AK
              </Avatar>

              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              {/* Bell icon */}
              <IconButton>
                <NotificationsIcon sx={{ color: '#555' }} />
              </IconButton>

              {/* Divider */}
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              {/* Grid icon */}
              <IconButton>
                <AppsIcon sx={{ color: '#555' }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
