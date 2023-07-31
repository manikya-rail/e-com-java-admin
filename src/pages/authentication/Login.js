// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import Header from './Header';
//import logo from 'assets/images/logo/techlogo.png';
import Logo from 'assets/images/logo/adminimage.jpeg';
// ================================|| LOGIN ||================================ //

const Login = () => (
  <AuthWrapper>
    <Header></Header>
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        {/* <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}> */}
        <img src={Logo} alt="logo" style={{ height: '65px', marginTop: '2px', marginLeft: 'auto' }}></img>
        <Typography variant="h3">Login</Typography>
        {/* </Stack> */}
      </Grid>
      <Grid item xs={12}>
        <AuthLogin />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Login;
