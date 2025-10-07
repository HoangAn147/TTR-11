export function useApi() {
  const $api = $fetch.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    retry: 1,
  })

  const { $axios } = useNuxtApp()

  return { $api, $axios }
}
