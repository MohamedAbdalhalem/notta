'use client'
import * as React from 'react';
import {AppBar,Box,Toolbar,Typography,IconButton,MenuItem,Menu} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useColorScheme } from '@mui/material/styles';
import SelectMode from '../SelectMode/SelectMode';
import { RootState } from '_/lib/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { deleteToken } from '_/lib/redux/authSlice';
export default  function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(deleteToken())
    setAnchorEl(null)
  }
  const { mode, setMode } = useColorScheme();
  const { Token } = useSelector((state: RootState) => state.authSlice)
  const dispatch = useDispatch()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  >
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href='/'>Notes</Link>
          </Typography>
          <SelectMode  mode={mode} setMode={setMode} /> 
          <div>
            
            
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
            </IconButton>
            
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
              {!Token ? <div>
                <Link href='/login'><MenuItem onClick={handleClose}>Login</MenuItem></Link>
                <Link href='/register'><MenuItem onClick={handleClose}>Register</MenuItem></Link>
              </div> : <MenuItem onClick={handleLogout}>Logout</MenuItem>} 
                
                
              </Menu>
            </div>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
