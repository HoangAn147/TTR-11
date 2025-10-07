import { defineStore } from 'pinia'

export interface Post {
  userId?: number
  id?: number
  title: string
  body: string
}

export const usePostStore = defineStore('posts', {
  state: () => ({
    items: [] as Post[],
    current: null as Post | null,
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchAll() {
      this.loading = true; this.error = null
      try {
        const { $api } = useApi()
        this.items = await $api<Post[]>('/posts')
      } catch (e: any) {
        this.error = e?.message ?? 'Failed to load posts'
      } finally {
        this.loading = false
      }
    },
    async fetchById(id: number) {
      this.loading = true; this.error = null
      try {
        const { $api } = useApi()
        this.current = await $api<Post>(`/posts/${id}`)
      } catch (e: any) {
        this.error = e?.message ?? 'Failed to load post'
      } finally {
        this.loading = false
      }
    },
    async createPost(newPost: Post) {
      this.loading = true; this.error = null
      try {
        // Example using axios POST
        const { $axios } = useApi()
        const res = await $axios.post<Post>('/posts', newPost)
        // JSONPlaceholder echoes the created entity
        this.items.unshift(res.data)
        return res.data
      } catch (e: any) {
        this.error = e?.message ?? 'Failed to create post'
        throw e
      } finally {
        this.loading = false
      }
    }
  }
})
