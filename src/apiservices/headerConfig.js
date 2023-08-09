import { getFromSessionStorage } from 'storageservices/storageUtils';

const jwtToken = getFromSessionStorage('jwt_token'); // Replace with your actual JWT token

const headerConfig = {
  add_headers: {
    Authorization: jwtToken,
    'Content-Type': 'multipart/form-data'
  },
  client_headers: {
    Authorization: jwtToken,
    'Content-Type': 'application/json'
  }
};

export default headerConfig;
