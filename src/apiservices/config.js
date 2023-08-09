const apiUrl = process.env.REACT_APP_API_URL;

const config = {
  loginurl: `${apiUrl}api/auth/login`,
  addClientUrl: `${apiUrl}api/auth/client/register`,
  getClientdetailsByIdUrl: `${apiUrl}api/auth`,
  getClientListUrl: `${apiUrl}api/auth/client`
};

export default config;
