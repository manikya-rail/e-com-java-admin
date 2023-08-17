import React, { useState, useEffect } from 'react';
import { Grid, IconButton, TextField, Fab, FormHelperText, Button } from '@mui/material';
import facebook from '../../assets/images/icons/facebook.svg';
import twitter from '../../assets/images/icons/twitter.svg';
import google from '../../assets/images/icons/google.svg';
import ComponentSkeleton from './ComponentSkeleton';
import { Camera } from 'react-bootstrap-icons';
import MainCard from 'components/MainCard';
import '../../assets/css/SuperAdminProfileEdit.css';
// import { Link as RouterLink } from 'react-router-dom';
import { getFromSessionStorage } from 'storageservices/storageUtils';
import { getSuperAdminProfile } from 'apiservices/Api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { editProfileApi } from 'apiservices/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { ToastContainer } from '../../../node_modules/react-toastify/dist/index';

export const SuperAdminProfileEdit = () => {
  const userProfile = getFromSessionStorage('userDetails');
  const userImage = getFromSessionStorage('s_image');
  const [profile, setProfile] = useState('');
  useEffect(() => {
    getSuperAdminProfile(userProfile && userProfile.id)
      .then((response) => {
        const data = response.data;
        if (data) {
          setProfile(data);
          console.log('successfully fetched');
        } else {
          console.log('error');
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  // if (!profile || !profile.image) {
  //     return null;
  //   }

  //   const byteArray = new Uint8Array(profile.image);
  //   const base64String = btoa(
  //     new Uint8Array(profile.image).reduce((data, byte) => data + String.fromCharCode(byte), '')
  //   );
  //   const imageSrc = `data:image/png;base64,${base64String}`;
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
    address: Yup.string().required('Address is required')
  });
  const handleSuccess = () => {
    setInterval('window.location.reload()', 3000);
    toast.success('Edited successfully!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  const handleError = (errorResponse) => {
    const errorMessage = errorResponse.data?.errorMessage || 'An error occurred';
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT
    });
  };
  const formik = useFormik({
    initialValues: {
      id: profile && profile.id,
      name: profile && profile.name,
      description: profile && profile.description,
      username: profile && profile.username,
      email: profile && profile.email,
      mobileNumber: profile && profile.mobileNumber,
      address: profile && profile.location
    },

    enableReinitialize: true,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: (values) => {
      const user = {
        name: values.name,
        description: values.description,
        username: values.username,
        email: values.email,
        mobileNumber: values.mobileNumber,
        location: values.address
      };

      const file = selectedFile;
      const formData = new FormData();
      // Append user data
      formData.append('user', JSON.stringify(user)); // Convert user object to JSON string

      // Append file data
      if (selectedFile) {
        formData.append('file', file, file.name);
      }
      //  else {
      //   formData.append('file', null);
      // }
      // Append previous image if it exists
      if (profile && profile.image) {
        formData.append('file', profile.image);
      }
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      //API CALL//
      editProfileApi(formData, profile.id)
        .then((response) => {
          const data = response;
          if (data.status === 200) {
            console.log('successfully edited');
            handleSuccess();
          } else {
            console.log('error');
            setError(data.errorMessage);
            handleError(response); // Display error message using react-toastify
          }
        })
        .catch((error) => {
          console.error(error);
          handleError(error.response); // Display error message using react-toastify
        });
      handleCancel();
    }
  });

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
  };

  return (
    <ComponentSkeleton>
      <ToastContainer />
      <h3>My Profile</h3>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <MainCard>
              {/* <Button as={RouterLink} to="/profile-edit">
              <Tooltip title="Edit profile">
                <PencilSquare id="editProfIcon" />
              </Tooltip>
            </Button> */}

              <Grid container xs={12} sm={12} md={12} lg={12}>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Grid item xs={12} sm={12} md={3} lg={12}>
                    {/* <img src={`data:image/png;base64,${userImage}`} alt="img" id="profilepic" />
                    <IconButton id="cameraIconButton">
                      {' '}
                      <Tooltip title="Edit profile image">
                        <Camera />
                      </Tooltip>
                    </IconButton> */}
                    <div>
                      {(selectedFile || userImage) && (
                        <div>
                          <h4>Profile Image:</h4>
                          <img
                            src={selectedFile ? URL.createObjectURL(selectedFile) : `data:image/png;base64,${userImage}`}
                            alt="Profile"
                            id="profilepic"
                            style={{ maxWidth: '200px', height: 'auto' }}
                          />
                        </div>
                      )}
                    </div>
                    <br></br>
                    <label htmlFor="file-upload" style={{ display: 'flex', alignItems: 'center', marginLeft: '100px' }}>
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
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={12} mt={3}>
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
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={12} mt={3}>
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
                      {formik.values.description
                        ? formik.values.description.length > 200
                          ? 'Description truncated to 200 characters'
                          : `Characters left: ${200 - formik.values.description.length}`
                        : 'Description not available'}
                    </FormHelperText>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={12} mt={3}>
                    <Grid container justifyContent="center">
                      <IconButton href="https://www.google.com/">
                        <img src={google} alt="google"></img>
                      </IconButton>
                      <IconButton href="https://www.facebook.com/">
                        <img src={facebook} alt="facebook"></img>
                      </IconButton>
                      <IconButton href="https://twitter.com/i/flow/login">
                        <img src={twitter} alt="twitter"></img>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={8} md={8} lg={8} id="secColProf">
                  <table id="secTable">
                    <tr>
                      <td>
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
                      </td>
                    </tr>
                    <br></br>
                    <tr>
                      <td>
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
                      </td>
                    </tr>
                    <br></br>
                    <tr>
                      <td>
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
                      </td>
                    </tr>
                    <br></br>
                    <tr>
                      <td>
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
                      </td>
                    </tr>
                  </table>
                  <Grid item xs={12} sm={12} md={3} lg={12} mt={3}>
                    <Grid container justifyContent="right">
                      {/* <Button variant="contained" color="error" onClick={handleCancel}>
                        Cancel
                      </Button> */}
                      <Button variant="contained" color="success" type="submit">
                        Edit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </form>
        </Grid>
        <Grid item xs={12}>
          <h3>Templates</h3>
          <MainCard>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                {/* <CustomShadowBox shadow={theme.customShadows.z1} label="z1" color="inherit" /> */}
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
};
