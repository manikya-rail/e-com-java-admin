import axios from 'axios';
import config from './config';
import headerConfig from './headerConfig';

export const loginApi = (data) => axios.post(config.loginurl, data);
export const addClientApi = (data) => axios.post(config.addClientUrl, data, headerConfig);
