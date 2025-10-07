import axios, { type AxiosInstance } from 'axios'

export default defineNuxtPlugin(() => {
  const instance: AxiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // đổi sang API thật của bạn nếu cần
    timeout: 15000
  })

  // Chỉ provide 1 lần, không gọi nuxtApp.provide trùng
  return {
    provide: { axios: instance }
  }
})
