import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export type Axios = AxiosInstance

export const createAxios = (config?: AxiosRequestConfig) => {
  const instance = axios.create(config)

  return instance
}
