import axios, {  AxiosRequestConfig } from 'axios'

export const createAxios = (config?: AxiosRequestConfig) => {
  const instance = axios.create(config)

  return instance
}
