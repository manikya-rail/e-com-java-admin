// material-ui
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  //  Breadcrumbs,
  //   Divider, 

  Grid,
  // Link,
  Stack, Tooltip, DialogTitle, Button, DialogContent, DialogActions, Dialog, DialogContentText
  , useMediaQuery, TextField, Box, Fab
  // Typography 
} from '@mui/material';






// project import
// import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import OrdersTable from '../dashboard/OrdersTable';
import '../../assets/css/clientList.css';

import { PlusSquareFill } from '../../../node_modules/react-bootstrap-icons/dist/index';
import { Camera } from '../../../node_modules/react-bootstrap-icons/dist/index';




// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //


const ClientList = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>

      <Grid item xs={12} md={12} lg={12}>
        {/* <Grid container alignItems="center" justifyContent="space-between">
        <Grid item />
      </Grid> */}
        <Grid item xs={12}>
          <Tooltip title="Add Client">
            <PlusSquareFill id="addClient" onClick={handleClickOpen} />
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <MainCard sx={{ mt: 0 }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
      </Grid>


      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <h4>Add Client</h4>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div>

                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { mt: 1 },  textAlign: 'center'
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth />

                  <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth multiline
                    rows={3} />

                  <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth />

                  <TextField id="outlined-basic" label="Email-ID" variant="outlined" type="email" fullWidth />

                  <TextField id="outlined-basic" label="Mobile Number" variant="outlined" type="email" fullWidth />

                  <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth multiline
                    rows={2} />

                  <TextField id="outlined-basic" label="Password" variant="outlined" type="password" fullWidth />

                  <Fab variant="extended" component="label" id="uploadfab" color="primary">
                    <Camera id='uploadProfIcon'/>
                    Upload profile image
                    <input
                      type="file"
                      hidden
                    />
                  </Fab>

                </Box>

              </div>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='error' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='contained' color='success' onClick={handleClose}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>


      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Stack spacing={3}>
            {/* <MainCard title="Basic" codeHighlight>
            <Stack spacing={0.75} sx={{ mt: -1.5 }}>
              <Typography variant="h1">Inter</Typography>
              <Typography variant="h5">Font Family</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Regular</Typography>
                <Typography variant="h6">Medium</Typography>
                <Typography variant="h6">Bold</Typography>
              </Breadcrumbs>
            </Stack>
          </MainCard> */}
            {/* <MainCard title="Heading" codeHighlight>
            <Stack spacing={2}>
              <Typography variant="h1">H1 Heading</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 38px</Typography>
                <Typography variant="h6">Weight: Bold</Typography>
                <Typography variant="h6">Line Height: 46px</Typography>
              </Breadcrumbs>
              <Divider />

              <Typography variant="h2">H2 Heading</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 30px</Typography>
                <Typography variant="h6">Weight: Bold</Typography>
                <Typography variant="h6">Line Height: 38px</Typography>
              </Breadcrumbs>
              <Divider />

              <Typography variant="h3">H3 Heading</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 24px</Typography>
                <Typography variant="h6">Weight: Regular & Bold</Typography>
                <Typography variant="h6">Line Height: 32px</Typography>
              </Breadcrumbs>
              <Divider />

              <Typography variant="h4">H4 Heading</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 20px</Typography>
                <Typography variant="h6">Weight: Bold</Typography>
                <Typography variant="h6">Line Height: 28px</Typography>
              </Breadcrumbs>
              <Divider />

              <Typography variant="h5">H5 Heading</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 16px</Typography>
                <Typography variant="h6">Weight: Regular & Medium & Bold</Typography>
                <Typography variant="h6">Line Height: 24px</Typography>
              </Breadcrumbs>
              <Divider />

              <Typography variant="h6">H6 Heading / Subheading</Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 14px</Typography>
                <Typography variant="h6">Weight: Regular</Typography>
                <Typography variant="h6">Line Height: 22px</Typography>
              </Breadcrumbs>
            </Stack>
          </MainCard>
          <MainCard title="Body 1" codeHighlight>
            <>
              <Typography variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 14px</Typography>
                <Typography variant="h6">Weight: Regular</Typography>
                <Typography variant="h6">Line Height: 22px</Typography>
              </Breadcrumbs>
            </>
          </MainCard>
          <MainCard title="Body 2" codeHighlight>
            <>
              <Typography variant="body2" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 12px</Typography>
                <Typography variant="h6">Weight: Regular</Typography>
                <Typography variant="h6">Line Height: 20px</Typography>
              </Breadcrumbs>
            </>
          </MainCard>
          <MainCard title="Subtitle 1" codeHighlight>
            <>
              <Typography variant="subtitle1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 14px</Typography>
                <Typography variant="h6">Weight: Medium</Typography>
                <Typography variant="h6">Line Height: 22px</Typography>
              </Breadcrumbs>
            </>
          </MainCard>
          <MainCard title="Subtitle 2" codeHighlight>
            <>
              <Typography variant="subtitle2" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 12px</Typography>
                <Typography variant="h6">Weight: Medium</Typography>
                <Typography variant="h6">Line Height: 20px</Typography>
              </Breadcrumbs>
            </>
          </MainCard>
          <MainCard title="Caption" codeHighlight>
            <Stack spacing={1}>
              <Typography variant="caption">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 12px</Typography>
                <Typography variant="h6">Weight: Regular</Typography>
                <Typography variant="h6">Line Height: 20px</Typography>
              </Breadcrumbs>
            </Stack>
          </MainCard>
        </Stack>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Stack spacing={3}>
          <MainCard title="Alignment" codeHighlight>
            <>
              <Typography variant="body2" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Typography variant="body2" textAlign="center" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Typography variant="body2" textAlign="right">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </>
          </MainCard>
          <MainCard title="Gutter Bottom" codeHighlight>
            <>
              <Typography variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Typography variant="body2" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 12px</Typography>
                <Typography variant="h6">Weight: Regular</Typography>
                <Typography variant="h6">Line Height: 20px</Typography>
              </Breadcrumbs>
            </>
          </MainCard>
          <MainCard title="Overline" codeHighlight>
            <Stack spacing={1.5}>
              <Typography variant="overline">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 12px</Typography>
                <Typography variant="h6">Weight: Regular</Typography>
                <Typography variant="h6">Line Height: 20px</Typography>
              </Breadcrumbs>
            </Stack>
          </MainCard>
          <MainCard title="Link" codeHighlight>
            <Stack spacing={1.5}>
              <Link href="#">www.mantis.com</Link>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 12px</Typography>
                <Typography variant="h6">Weight: Regular</Typography>
                <Typography variant="h6">Line Height: 20px</Typography>
              </Breadcrumbs>
            </Stack>
          </MainCard>
          <MainCard title="Colors" codeHighlight>
            <>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                This is textPrimary text color.
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                This is textSecondary text color.
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                This is primary text color.
              </Typography>
              <Typography variant="h6" color="secondary" gutterBottom>
                This is secondary text color.
              </Typography>
              <Typography variant="h6" color="success" gutterBottom>
                This is success text color.
              </Typography>
              <Typography variant="h6" sx={{ color: 'warning.main' }} gutterBottom>
                This is warning text color.
              </Typography>
              <Typography variant="h6" color="error" gutterBottom>
                This is error text color.
              </Typography>
            </>
          </MainCard>
          <MainCard title="Paragraph" codeHighlight>
            <>
              <Typography variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 14px</Typography>
                <Typography variant="h6">Weight: Regular</Typography>
                <Typography variant="h6">Line Height: 22px</Typography>
              </Breadcrumbs>
            </>
          </MainCard>
          <MainCard title="Font Style" codeHighlight>
            <>
              <Typography variant="body1" gutterBottom sx={{ fontStyle: 'italic' }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Typography variant="subtitle1" gutterBottom sx={{ fontStyle: 'italic' }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Breadcrumbs aria-label="breadcrumb">
                <Typography variant="h6">Size: 14px</Typography>
                <Typography variant="h6">Weight: Italic Regular & Italic Bold</Typography>
                <Typography variant="h6">Line Height: 22px</Typography>
              </Breadcrumbs>
            </>
          </MainCard> */}
          </Stack>
        </Grid>
      </Grid>
    </>
  )
};

export default ClientList;
