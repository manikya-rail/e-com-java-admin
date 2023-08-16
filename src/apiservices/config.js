const apiUrl = process.env.REACT_APP_API_URL;

const config = {
  loginurl: `${apiUrl}api/auth/login`,
  addClientUrl: `${apiUrl}api/auth/client/register`,
  getClientdetailsByIdUrl: `${apiUrl}api/auth/client`,
  getClientListUrl: `${apiUrl}api/auth/client`,
  getClientImageUrl: `${apiUrl}api/auth/image`,
  getSuperAdminProfile: `${apiUrl}api/auth/client`,
  editProfileUrl: `${apiUrl}api/auth/client/edit`,
  deleteClientUrl: `${apiUrl}api/auth/client/delete`
};

export default config;
