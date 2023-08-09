import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// material-ui
// import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, IconButton, TextField, Tooltip } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';

//import userImg from '../../assets/images/users/userpng.png';
import facebook from '../../assets/images/icons/facebook.svg';
import twitter from '../../assets/images/icons/twitter.svg';
import google from '../../assets/images/icons/google.svg';
import '../../assets/css/clientDetails.css';
import { PencilSquare } from '../../../node_modules/react-bootstrap-icons/dist/index';
import EditProfile from './EditProfile';
import { getClientDetailsByIdApi } from 'apiservices/Api';
import { saveToSessionStorage, getFromSessionStorage } from 'storageservices/storageUtils';
// ===============================|| SHADOW BOX ||=============================== //

function ShadowBox({ shadow }) {
  return (
    <MainCard border={false} sx={{ boxShadow: shadow }}>
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Typography variant="h6">boxShadow</Typography>
        <Typography variant="subtitle1">{shadow}</Typography>
      </Stack>
    </MainCard>
  );
}

ShadowBox.propTypes = {
  shadow: PropTypes.string.isRequired
};

const ClientDetails = () => {
  //const ByteArray = getFromSessionStorage('s_image');
  const [clientDetails, setClientDetails] = useState(null);
  const [error, setError] = useState(null);
  //const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const clientId = 2; // Replace with another client ID
        const details = await getClientDetailsByIdApi(clientId); // Await the Promise
        setClientDetails(details.data);
        if (details.data.image) {
          const byteArray = details.data.image;
          saveToSessionStorage('client_image', byteArray);
          //   const blob = new Blob([byteArray], { type: 'image/png' }); // Adjust the MIME type if necessary
          //   const src = URL.createObjectURL(blob);
          //   setImageSrc(src);
        }
      } catch (error) {
        setError(error); // Handle API call errors
        console.error('Error fetching client details:', error);
      }
    };

    fetchClientDetails();
  }, []);
  // console.log(clientDetails.data);
  //const ByteArray = clientDetails.image;
  const image = getFromSessionStorage('client_image');
  console.log(image);
  const [profileEditModalOpen, setProfileEditModalOpen] = useState(false);
  const handleEditClick = () => {
    setProfileEditModalOpen(true);
  };

  const handleModalClose = () => {
    setProfileEditModalOpen(false);
  };
  return (
    <>
      <ComponentSkeleton>
        <h3>Profile</h3>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {error ? (
              <p>Error fetching client details: {error.message}</p>
            ) : clientDetails ? (
              <MainCard>
                <button onClick={handleEditClick}>
                  <Tooltip title="Edit profile">
                    <PencilSquare id="editProfIcon" />
                  </Tooltip>
                </button>

                <Grid container xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Grid item xs={12} sm={12} md={3} lg={12}>
                      {/* <img src={userImg} alt="img" id="profilepic" /> */}
                      <img src={`data:image/png;base64,${image}`} alt="img" id="profilepic" />
                      {/* {imageSrc && <img src={imageSrc} alt="Profile" />} */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={12} mt={3}>
                      <Typography variant="h5" id="profDetails">
                        {clientDetails && clientDetails.name}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={12} mt={3}>
                      <Typography variant="h6" id="profDetailsDesc">
                        {clientDetails && clientDetails.description}
                      </Typography>
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
                            id="outlined-readonly-prof"
                            label="Registration No"
                            defaultValue={clientDetails && clientDetails.id}
                            multiline
                            fullWidth
                            InputProps={{
                              readOnly: true
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextField
                            id="outlined-readonly-prof"
                            label="Address"
                            defaultValue={clientDetails && clientDetails.location}
                            multiline
                            fullWidth
                            InputProps={{
                              readOnly: true
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextField
                            id="outlined-readonly-prof"
                            label="Email-ID"
                            defaultValue={clientDetails && clientDetails.email}
                            multiline
                            fullWidth
                            InputProps={{
                              readOnly: true
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextField
                            id="outlined-readonly-prof"
                            label="contact number"
                            defaultValue={clientDetails && clientDetails.mobileNumber}
                            multiline
                            fullWidth
                            InputProps={{
                              readOnly: true
                            }}
                          />
                        </td>
                      </tr>
                    </table>
                  </Grid>
                </Grid>
              </MainCard>
            ) : (
              <p>Loading client details...</p>
            )}
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
      <EditProfile open={profileEditModalOpen} onClose={handleModalClose}></EditProfile>
    </>
  );
};

export default ClientDetails;
