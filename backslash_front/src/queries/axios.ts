import Axios, { InternalAxiosRequestConfig } from 'axios'

import { ServerUrls } from '@constants/api.constants'
import { Environment } from '@constants/global.constants'

const NODE_ENV = process.env.NODE_ENV as Environment

export const axios = Axios.create({
  baseURL: ServerUrls[NODE_ENV ?? Environment.Development]
})

axios.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers = config.headers || {}

  config.headers.Accept = 'application/json'

  return config
})
