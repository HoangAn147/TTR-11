<script setup lang="ts">
import { useMovieStore } from '~/stores/movieStore'

const store = useMovieStore()

// fetch chỉ phía client để tránh SSR lỗi khi API/env chưa sẵn
await useAsyncData('movies-list', async () => {
  await store.fetchAll()
  return null
}, { server: false })

useHead({
  title: 'Danh sách phim | Agency Demo',
  meta: [{ name: 'description', content: 'Danh sách phim (mock) từ JSONPlaceholder' }]
})
</script>

<template>
  <section class="container py-5">
    <h1 class="mb-4">Movies</h1>

    <div v-if="store.loading">Đang tải...</div>
    <div v-else-if="store.error" class="text-danger">Lỗi: {{ store.error }}</div>

    <div v-else class="row g-3">
      <div v-for="m in store.items" :key="m.id" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 p-3">
          <h5 class="mb-2">{{ m.title }}</h5>
          <p class="mb-3 text-muted">{{ m.body || '—' }}</p>
          <NuxtLink :to="`/movies/${m.id}`" class="btn btn-primary btn-sm">Xem chi tiết</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
