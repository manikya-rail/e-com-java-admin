import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
//import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


function Footer() {
  return (
    <Box>
      <AppBar position="static" style={{ backgroundColor: '#fff', bottom:'0',position:'absolute',height:'65px', textAlign: 'center' }}>
        <Grid container>
          <Grid xs={4}></Grid>
          <Grid xs={4} style={{textAlign:'center'}}>
          {/* <Toolbar variant="dense"> */}
            <Typography  color="#000" component="div" style={{ marginTop: '20px',marginLeft:'45px' }}>
              Copyright © Techversant 2023.
            </Typography>
          {/* </Toolbar> */}
          </Grid>
          <Grid xs={4}></Grid>
        </Grid>
      </AppBar>
    </Box>
  )
}

export default Footer
