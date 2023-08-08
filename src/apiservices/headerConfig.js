import { getFromSessionStorage } from 'storageservices/storageUtils';

const jwtToken = getFromSessionStorage('jwt_token'); // Replace with your actual JWT token

const headerConfig = {
  headers: {
    Authorization: jwtToken,
    'Content-Type': 'multipart/form-data'
  }
};

export default headerConfig;
