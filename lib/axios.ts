import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export default const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})


// lib/generated/axios.ts

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
