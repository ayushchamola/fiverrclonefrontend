import axios from 'axios'

const newRequest = axios.create({
  baseURL: 'https://fiverr-backend-ltpr.onrender.com/api/',
  withCredentials: true,
})

export default newRequest
