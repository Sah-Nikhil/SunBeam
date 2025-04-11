import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// error handling middleware
api.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  )

export default api
