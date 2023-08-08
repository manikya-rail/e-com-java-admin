const apiUrl = process.env.REACT_APP_API_URL;

const config = {
  loginurl: `${apiUrl}api/auth/login`,
  addClientUrl: `${apiUrl}api/auth/register`,
  getSuperAdminProfile: `${apiUrl}api/auth`
};

export default config;
