import axios from 'axios';

const $api = axios.create({
  withCredentials: true,  
  responseType: 'json',   
});

/* == $API with response interceptors == */
$api.interceptors.response.use(
  (config) => config,
  (error) => {
    throw error;
  }
);

export default $api;
