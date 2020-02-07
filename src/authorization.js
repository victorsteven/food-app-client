import axios from 'axios';
import API_ROUTE from './env';

const customAxios = axios.create({})

customAxios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`
    }
    return config
  },
  (error) => {
    console.log("the error in the request: ", error)
    return Promise.reject(error)
  }
)

//Response 
customAxios.interceptors.response.use(
  (response) => {
    //if the request succeeds, we dont have to do anything and just return the response
    return response
  },
  (error) => {
    if(error.response.status == 401 && (error.response.data == "Token is expired" || error.response.data == "token contains an invalid number of segments")) {
      return refreshToken(error)
    }
    return Promise.reject(error)
  }
)

async function refreshToken(error) {
  try {
    const originalRequest = error.config;
    
    const res = await axios.post(`${API_ROUTE}/token/refresh`, {
      "refresh_token": localStorage.getItem('refresh_token')
    })
    localStorage.clear()
    if (!res) {
      return Promise.reject(error);
    }
    if (res.status == 201) {
      localStorage.setItem('access_token', res.data.access_token)
      localStorage.setItem('refresh_token', res.data.refresh_token)
    }
    //Change the authorization header
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;

    //return originalRequest object with Axios
    return customAxios(originalRequest);
  } catch(err) {
    //The refresh token has expired, clear the cache and redirect to login
    if (err.response.data == "Refresh token has expired") {
      localStorage.clear()
      window.location.href = "/login"
    }
    return Promise.reject(err);
  }
}
export default customAxios