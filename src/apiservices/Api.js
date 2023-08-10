import axios from 'axios';
import config from './config';
import headerConfig from './headerConfig';

export const loginApi = (data) => axios.post(config.loginurl, data);
export const addClientApi = (data) => axios.post(config.addClientUrl, data, headerConfig.add_headers);
export const getClientDetailsByIdApi = (id) => axios.get(`${config.getClientdetailsByIdUrl}/${id}`, headerConfig.client_headers);
export const getAllClientApi = () => axios.get(config.getClientListUrl, headerConfig.client_headers);
export const getClientImageApi = (id) => axios.get(`${config.getClientImageUrl}/${id}`, headerConfig.image_headers);
export const getSuperAdminProfile = (id) => axios.get(`${config.getSuperAdminProfile}/${id}`, headerConfig);
