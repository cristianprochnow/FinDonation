import axios from 'axios'

const {
  REACT_APP_SERVER_BASE_URL,
  REACT_APP_SERVER_PORT
} = process.env

export const api = axios.create({
  baseURL: `${REACT_APP_SERVER_BASE_URL}:${REACT_APP_SERVER_PORT}`
})
