import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TaxAddUpdate from './components/TaxAddUpdate';
import TaxList from './components/TaxList';
import {AppBar,Toolbar,Typography,Drawer,List,ListItem,ListItemText} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const AppBarStyled = styled(AppBar)({
  width: 100,
  position: 'fixed',
  left: 0,
  top: 0,
  height: '100vh',
});

const Content = styled('main')({
  marginLeft: 90,
  padding: '16px',
});

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  
  return (
    <div className="App">
      <Router>
        <AppBarStyled>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
             
            </Typography>
          </Toolbar>
        </AppBarStyled>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
          variant="temporary"
        >
          <List>
            <ListItem onClick={handleDrawerClose} component={Link} sx={{color:'black'}}  to="/">
              <ListItemText primary="Listeleme" />
            </ListItem>
            <ListItem  onClick={handleDrawerClose} component={Link} sx={{color:'black'}} to="/add-update">
              <ListItemText primary="Vergi Tanımı" />
            </ListItem>
          </List>
        </Drawer>

        <Content>
          <Routes>
            <Route path="/" element={<TaxList />} />
            <Route path="/add-update" element={<TaxAddUpdate />} /> {/* yeni kayıt eklemek için */}
            <Route path="/add-update/:id" element={<TaxAddUpdate />} /> {/* Güncelleme için parametre ile */}
          </Routes>
        </Content>
      </Router>
    </div>
  );
}

export default App;
