import React, { useState } from 'react';
import { Row, Col, Button, ModalHeader, ModalBody } from 'reactstrap';
import { Typography, Box, Modal, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
//import { useFormik } from 'formik';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4
};
const ProfileEditModal = () => {
  const [teacherModal] = useState(false);
  //   const [profileData, setProfileData] = useState(initialProfileData);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setProfileData((prevData) => ({ ...prevData, [name]: value }));
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add logic to save the updated profile data
    console.log('Updated profile data:', profileData);
    onClose();
  };

  return (
    <Modal open={teacherModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <form onSubmit={handleSubmit}>
        <Box
          sx={style}
          style={{
            borderRadius: '10px',
            textAlign: 'center',
            width: '90%',
            height: '90%',
            backgroundColor: '#F0F8FF',
            borderBlockColor: 'greenyellow',
            overflow: 'auto'
          }}
        >
          <ModalHeader
            style={{
              justifyItems: 'center',
              backgroundColor: '#F0FFF0',
              borderBlockColor: 'greenyellow'
            }}
          >
            <Typography
              id="modal-modal-title"
              style={{
                alignContent: 'center',
                color: '#483D8B',
                fontWeight: '750',
                fontSize: '25px'
              }}
            >
              Add Teacher
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Row>
              <div
                style={{
                  backgroundColor: '#87CEFA',
                  borderRadius: '200px',
                  padding: '2px',
                  textAlign: 'center'
                }}
              >
                <h3 style={{ color: 'white' }}>---Personal Details---</h3>
              </div>
            </Row>
            <hr></hr>
            <Row>
              <Col>
                <FormControl style={{ marginBottom: '10px' }}>
                  <TextField
                    required
                    id="outlined-required"
                    placeholder="Name"
                    label="Name"
                    name="name"
                    style={{ width: '230px' }}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    fullWidth
                  />
                </FormControl>
              </Col>
              <Col>
                <FormControl style={{ marginBottom: '10px' }}>
                  <TextField
                    required
                    id="outlined-required"
                    placeholder="Location"
                    label="Location"
                    name="location"
                    style={{ width: '230px' }}
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                    fullWidth
                  />
                </FormControl>
              </Col>
              <Col>
                <FormControl style={{ marginBottom: '10px' }}>
                  <TextField
                    required
                    id="outlined-required"
                    placeholder="Description"
                    label="Description"
                    name="description"
                    style={{ width: '230px' }}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    fullWidth
                  />
                </FormControl>
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <Col>
                <FormControl style={{ marginBottom: '10px' }}>
                  <TextField
                    required
                    id="outlined-required"
                    placeholder="Mobile No."
                    label="Mobile No."
                    type="tel"
                    name="mobileno"
                    style={{ width: '230px' }}
                    value={formik.values.mobileno}
                    onChange={formik.handleChange}
                    error={formik.touched.mobileno && Boolean(formik.errors.mobileno)}
                    helperText={formik.touched.mobileno && formik.errors.mobileno}
                    fullWidth
                  />
                </FormControl>
              </Col>
              <Col>
                <FormControl style={{ marginBottom: '10px' }}>
                  <TextField
                    required
                    id="outlined-required"
                    placeholder="Email"
                    label="Email"
                    type="email"
                    name="email"
                    style={{ width: '230px' }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                  />
                </FormControl>
              </Col>
              <Col>
                <FormControl style={{ marginBottom: '10px' }}>
                  <TextField
                    required
                    id="outlined-required"
                    placeholder="Username"
                    label="Username"
                    name="username"
                    style={{ width: '230px' }}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    fullWidth
                  />
                </FormControl>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col>
                <FormControl style={{ marginBottom: '10px' }}>
                  <TextField
                    required
                    id="outlined-required"
                    placeholder="Password"
                    label="Password"
                    type="password"
                    name="password"
                    style={{ width: '230px' }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                  />
                </FormControl>
              </Col>
            </Row>
            <br></br>
            <Button color="success" type="submit">
              Submit
            </Button>
          </ModalBody>
        </Box>
      </form>
    </Modal>
  );
};

export default ProfileEditModal;
