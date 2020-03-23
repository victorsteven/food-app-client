import axios from 'axios';
import API_ROUTE from './.env';

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
    if(error.response.data.error == "Token is expired" || error.response.data.error == "token contains an invalid number of segments") {
      return refreshToken(error)
    }
    return Promise.reject(error)
  }
)

async function refreshToken(error) {
  console.log("We entered here")
  try {
    const originalRequest = error.config;
    
    const res = await axios.post(`${API_ROUTE}/refresh`, {
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
    console.log("the ode: ", err.response.data)
    //The refresh token has expired, clear the cache and redirect to login
    if (err.response.data == "Refresh token has expired" || err.response.data == "Token is expired") {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      window.location.href = "/login"
    }
    return Promise.reject(err);
  }
}
export default customAxios