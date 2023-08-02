import * as React from 'react';
import {
  DialogTitle,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
  DialogContentText,
  TextField,
  Box,
  useMediaQuery,
  Fab
  // Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Camera } from '../../../node_modules/react-bootstrap-icons/dist/index';

const EditProfile = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog fullScreen={fullScreen} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          <h4>Edit Profile</h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { mt: 1 },
                  textAlign: 'center'
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth />

                <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth multiline rows={3} />

                <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth />

                <TextField id="outlined-basic" label="Email-ID" variant="outlined" type="email" fullWidth />

                <TextField id="outlined-basic" label="Mobile Number" variant="outlined" type="email" fullWidth />

                <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth multiline rows={2} />

                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" fullWidth />

                <Fab variant="extended" component="label" id="uploadfab" color="primary">
                  <Camera id="uploadProfIcon" />
                  Upload profile image
                  <input type="file" hidden />
                </Fab>
              </Box>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleClose}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default EditProfile;
