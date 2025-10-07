// src/stores/movieStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Movie { id: number; title: string; body?: string }

export const useMovieStore = defineStore('movies', () => {
  const { $axios } = useNuxtApp()

  const items = ref<Movie[]>([])
  const current = ref<Movie | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAll = async () => {
    loading.value = true; error.value = null
    try {
      const { data } = await $axios.get<Movie[]>('/posts')
      items.value = data ?? []
    } catch (e: any) {
      error.value = e.message || 'Fetch movies failed'
    } finally {
      loading.value = false
    }
  }

  const fetchById = async (id: number) => {
    loading.value = true; error.value = null
    try {
      const { data } = await $axios.get<Movie>(`/posts/${id}`)
      current.value = data ?? null
    } catch (e: any) {
      error.value = e.message || 'Fetch movie failed'
      current.value = null
    } finally {
      loading.value = false
    }
  }

  return { items, current, loading, error, fetchAll, fetchById }
})
