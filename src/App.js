import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TaxAddUpdate from './components/TaxAddUpdate';
import TaxList from './components/TaxList';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/">Listeleme</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/add-update/0">Vergi Tanımı</MenuItem>
        </Menu>

        <Routes>
          <Route path="/" element={<TaxList />} />
          <Route path="/add-update/:id" element={<TaxAddUpdate />} /> {/* Güncelleme için parametre ile */}
          </Routes>
        </Router> 
    </div>
    
  );

}
export default App;
