const apiUrl = process.env.REACT_APP_API_URL;

const config = {
  loginurl: `${apiUrl}api/auth/login`,
  addClientUrl: `${apiUrl}api/auth/register`
};

export default config;
