import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton,
  Fab,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff, Camera } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditProfile = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
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
    validateOnBlur: true
    // onSubmit: (values) => {
    //   console.log(values);
    //   onClose();
    // }
  });
  const handleSubmit = (event) => {
    event.preventDefault();

    if (formik.isValid) {
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
      onClose();
    }
  };
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
    onClose();
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleCancel} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        <h3>Edit Profile</h3>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
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
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProfile;
