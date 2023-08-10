import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// material-ui
// import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, IconButton, TextField, Tooltip } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';
//import ByteToImage from './ByteToImage';
//import userImg from '../../assets/images/users/userpng.png';
import facebook from '../../assets/images/icons/facebook.svg';
import twitter from '../../assets/images/icons/twitter.svg';
import google from '../../assets/images/icons/google.svg';
import '../../assets/css/clientDetails.css';
import { PencilSquare } from '../../../node_modules/react-bootstrap-icons/dist/index';
import EditProfile from './EditProfile';
import { getClientDetailsByIdApi, getClientImageApi } from 'apiservices/Api';
import { useParams } from 'react-router-dom';
//import { saveToSessionStorage} from 'storageservices/storageUtils';
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
  const { id } = useParams();
  const [clientDetails, setClientDetails] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const details = await getClientDetailsByIdApi(id); // Await the Promise
        setClientDetails(details.data);
        const imageDetails = await getClientImageApi(id);
        // const blob = new Blob([imageDetails.data], { type: 'image/png' }); // Adjust MIME type as needed
        // const imageUrl = URL.createObjectURL(blob);
        // setImage(imageUrl);
        //     setImageSrc(imageUrl);
        //setImage(imageDetails.data);
        setImage('data:image/jpeg;base64,' + imageDetails.data);
       // console.log(imageUrl);
      } catch (error) {
        setError(error); // Handle API call errors
        console.error('Error fetching client details:', error);
      }
    };

    fetchClientDetails();
  }, []);

  const [profileEditModalOpen, setProfileEditModalOpen] = useState(false);
  const [clientDetailsEdit, setClientDetailsEdit] = useState(false);

  const handleEditClick = (clientDetails) => {
    setClientDetailsEdit(clientDetails);
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
                <button onClick={() => handleEditClick(clientDetails)}>
                  <Tooltip title="Edit profile">
                    <PencilSquare id="editProfIcon" />
                  </Tooltip>
                </button>

                <Grid container xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Grid item xs={12} sm={12} md={3} lg={12}>
                      {/* <img src={image} alt="img" id="profilepic" /> */}
                      <img src={image} alt="img" />
                      {/* {image} */}
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
      <EditProfile open={profileEditModalOpen} onClose={handleModalClose} clientDetailsEdit={clientDetailsEdit}></EditProfile>
    </>
  );
};

export default ClientDetails;
