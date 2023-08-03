import React from 'react';
//import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import {
  Button,
  //Checkbox,
  //Divider,
  //FormControlLabel,
  FormHelperText,
  Grid,
  //Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Alert
  //Typography
} from '@mui/material';
//import { ApiUrl } from 'common/commonUrl.jsx';
// third party
import * as yup from 'yup';
import { useFormik } from 'formik';
// project import
//import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router-dom';
// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import jQuery from 'jquery';
import axios from 'axios';

const validationSchema = yup.object({
  email: yup.string().email().required('Email is required').min(5),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character (@$!%*?&), and be 8 to 20 characters long'
    )
});

const AuthLogin = () => {
  //const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const apiUrl = process.env.REACT_APP_API_URL;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: false,

    onSubmit: (values) => {
      const email = values.email;
      const password = values.password;
      //const username=null;
      axios
        .post(`${apiUrl}api/auth/login`, {
          email: email,
          password: password,
          username: null
        })
        .then((response) => {
          // Handle the response data directly, no need for response.json()
          const data = response.data;
          if (data) {
            if (data.userDetails.role == 'SUPER_ADMIN') navigate('/dashboard');
          } else {
            console.log('error');
            jQuery('#wrongUserAlert').show();
          }
        })

        //Authentication.registerSuccessfulLogin(data);

        // if (data.errorCode === 0 && data.user !== null) {
        //   if (data.user.role.role === 'SuperAdmin') navigate('/dash');
        //   console.log(data);
        // }
        // if (data.user.role.role === 'Admin') {
        //   if (data.user.school.dbName !== dbName) {
        //     console.log(data.user.role.role);
        //     Authentication.setSchool(data.user.school);
        //     navigate('/schooldashboard');
        //   }
        //}

        .catch((err) => {
          jQuery('#wrongUserAlert').show();
          jQuery('#wrongUserAlert').css('display', 'flex');
          console.log(err.message);
        });
    }
  });
  const Close = () => {
    // jQuery('#usernameAlert').css('display', 'none');
    // jQuery('#passwordAlert').css('display', 'none');
    jQuery('#wrongUserAlert').css('display', 'none');
  };

  return (
    <>
      <Collapse in={open}>
        {' '}
        <Alert
          severity="error"
          id="wrongUserAlert"
          style={{ display: 'none', marginTop: '10px' }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                //setOpen(false);
                Close();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Please check the Username / Password
        </Alert>{' '}
      </Collapse>

      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <OutlinedInput
                id="email-login"
                type="email"
                value={formik.values.email}
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter email address"
                fullWidth
                error={Boolean(formik.touched.email && formik.errors.email)}
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {formik.errors.email}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(formik.touched.password && formik.errors.password)}
                id="-password-login"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Enter password"
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {formik.errors.password}
                </FormHelperText>
              )}
            </Stack>
          </Grid>

          {/* <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid> */}
          {formik.errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <AnimateButton>
              <Button fullWidth size="large" type="submit" variant="contained" color="primary">
                Login
              </Button>
            </AnimateButton>
          </Grid>
          {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
        </Grid>
      </form>
      {/* </Formik> */}
    </>
  );
};

export default AuthLogin;
