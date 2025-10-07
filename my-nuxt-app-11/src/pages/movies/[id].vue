<script setup lang="ts">
import { useMovieStore } from '~/stores/movieStore'

const route = useRoute()
const id = Number(route.params.id)

const store = useMovieStore()

await useAsyncData(`movie-${id}`, async () => {
  await store.fetchById(id)
  return null
}, { server: false })

watch(() => route.params.id, async (v) => {
  const nid = Number(v)
  if (!Number.isNaN(nid)) {
    await store.fetchById(nid)
  }
})

useHead(() => ({
  title: store.current ? `Chi tiết phim ${store.current.title}` : 'Chi tiết phim',
  meta: [{ name: 'description', content: store.current?.body || 'Thông tin chi tiết phim' }]
}))
</script>

<template>
  <section class="container py-5">
    <NuxtLink to="/movies" class="btn btn-link p-0 mb-3">← Quay lại</NuxtLink>

    <div v-if="store.loading">Đang tải...</div>
    <div v-else-if="store.error" class="text-danger">Lỗi: {{ store.error }}</div>

    <article v-else-if="store.current">
      <h1 class="mb-3">{{ store.current.title }}</h1>
      <p class="lead">{{ store.current.body || '—' }}</p>
    </article>
  </section>
</template>
