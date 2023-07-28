import React from 'react'
//import techLogoo from '../../images/techLogoo.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//import Typography from '@mui/material/Typography';
import Button from '@mui/material/IconButton';
import Logo from 'assets/images/logo/techlogo.png';

//import 'assets/css/navbar.css';
function Header() {
  return (
    <Box>
    <AppBar position="absolute" style={{backgroundColor:'#fff',height:'70px'}}>
      <Toolbar variant="dense">
        <Button edge="start" color="inherit" aria-label="menu" sx={{ mr:-2 }}>
         <img src={Logo} alt="logo" style={{height:'65px',marginTop:'22px',marginLeft:'100px'}}></img>
        </Button>
        {/* <Typography variant="h4" color="#198ccb" component="div">
          Techversant
        </Typography> */}
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header
