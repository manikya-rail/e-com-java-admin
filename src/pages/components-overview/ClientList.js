// material-ui
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  //  Breadcrumbs,
  //   Divider,

  Grid,
  // Link,
  Stack,
  Tooltip,
  DialogTitle,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
  DialogContentText,
  useMediaQuery,
  TextField,
  Box,
  Fab,
  InputAdornment,
  IconButton,
  FormHelperText
  // Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// project import
// import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import OrdersTable from '../dashboard/OrdersTable';
import '../../assets/css/clientList.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PlusSquareFill } from '../../../node_modules/react-bootstrap-icons/dist/index';
import { Camera } from '../../../node_modules/react-bootstrap-icons/dist/index';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const ClientList = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required').max(200, 'Description must be at most 200 characters long'),
    username: Yup.string()
      .required('Username is required')
      .matches(/^[a-zA-Z0-9_]+$/, 'Username must only contain letters, numbers, and underscores')
      .min(4, 'Username must be at least 4 characters long')
      .max(20, 'Username must be at most 20 characters long'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    mobileNumber: Yup.string()
      .required('Mobile Number is required')
      .matches(/^[0-9]{10}$/, 'Mobile Number must be a 10-digit number'),
    address: Yup.string().required('Address is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character (@$!%*?&), and be 8 to 20 characters long'
      )
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      username: '',
      email: '',
      mobileNumber: '',
      address: '',
      password: ''
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log(values);
      // if (formik.isValid) {
      const formData = new FormData();

      formData.append('name', formik.values.name);
      formData.append('description', formik.values.description);
      formData.append('username', formik.values.username);
      formData.append('email', formik.values.email);
      formData.append('mobileNumber', formik.values.mobileNumber);
      formData.append('address', formik.values.address);
      formData.append('password', formik.values.password);

      // Append any file you want to upload
      // Assuming you have an input field with type="file" and name="profileImage"
      const fileInput = document.getElementById('file-upload');
      if (fileInput && fileInput.files.length > 0) {
        formData.append('file-upload', fileInput.files[0]);
      }
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      //   onClose();
      handleCancel();
    }
  });
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (formik.isValid) {
  //     const formData = new FormData();

  //     formData.append('name', formik.values.name);
  //     formData.append('description', formik.values.description);
  //     formData.append('username', formik.values.username);
  //     formData.append('email', formik.values.email);
  //     formData.append('mobileNumber', formik.values.mobileNumber);
  //     formData.append('address', formik.values.address);
  //     formData.append('password', formik.values.password);

  //     // Append any file you want to upload
  //     // Assuming you have an input field with type="file" and name="profileImage"
  //     const fileInput = document.getElementById('file-upload');
  //     if (fileInput && fileInput.files.length > 0) {
  //       formData.append('file-upload', fileInput.files[0]);
  //     }
  //     for (const pair of formData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }
  // fetch('your-server-url', {
  //   method: 'POST',
  //   body: formData
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // Handle the response from the server if needed
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     // Handle any errors
  //     console.error(error);
  //   });
  //setSelectedFile(null);
  // Close the modal after form submission
  //     handleClose();
  //     //onClose();
  //   }
  // };
  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    if (description.length <= 200) {
      formik.handleChange(event);
    } else {
      // Truncate the input to 200 characters
      const truncatedDescription = description.slice(0, 200);
      formik.setFieldValue('description', truncatedDescription);
    }
  };

  const handleCancel = () => {
    formik.resetForm();
    setSelectedFile(null);
    handleClose();
  };

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
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title">
            <h4>Add Client</h4>
          </DialogTitle>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent style={{ marginTop: '-35px' }}>
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
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      required
                      variant="outlined"
                      fullWidth
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      required
                      value={formik.values.description}
                      onBlur={formik.handleBlur}
                      onChange={handleDescriptionChange}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={
                        formik.touched.description && (formik.errors.description ? 'Description must be at most 200 characters long' : '')
                      }
                    />
                    <FormHelperText variant="caption" color="textSecondary">
                      {formik.values.description.length > 200
                        ? 'Description truncated to 200 characters'
                        : `Characters left: ${200 - formik.values.description.length}`}
                    </FormHelperText>

                    <TextField
                      id="username"
                      name="username"
                      label="Username"
                      variant="outlined"
                      fullWidth
                      required
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                      id="email"
                      name="email"
                      label="Email-ID"
                      variant="outlined"
                      type="email"
                      fullWidth
                      required
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                      id="mobileNumber"
                      name="mobileNumber"
                      label="Mobile Number"
                      variant="outlined"
                      fullWidth
                      required
                      value={formik.values.mobileNumber}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                      helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                    />
                    <TextField
                      id="address"
                      name="address"
                      label="Address"
                      variant="outlined"
                      fullWidth
                      multiline
                      required
                      rows={2}
                      value={formik.values.address}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      required
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        style: { color: formik.touched.password && formik.errors.password ? 'red' : 'inherit' }
                      }}
                    />

                    {/* Add the following to handle file input */}
                    <label htmlFor="file-upload" style={{ display: 'flex', alignItems: 'center' }}>
                      <Fab variant="extended" color="primary" component="span">
                        <Camera />
                        Upload profile image
                      </Fab>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) => {
                          const file = event.target.files[0];
                          setSelectedFile(file);
                          // Add any additional handling for the selected file if needed
                        }}
                      />
                    </label>

                    {/* Show the selected image preview */}
                    {selectedFile && (
                      <div>
                        <h4>Selected Image:</h4>
                        <img src={URL.createObjectURL(selectedFile)} alt="Profile" style={{ width: '200px' }} />
                      </div>
                    )}
                  </Box>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="error" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="success" type="submit">
                Add
              </Button>
            </DialogActions>
          </form>
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
  );
};

export default ClientList;
