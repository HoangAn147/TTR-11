<template>
  <section class="container py-5">
    <h1 class="mb-4">Bài viết (GET)</h1>

    <div v-if="loading">Đang tải...</div>
    <div v-else-if="error" class="text-danger">Lỗi: {{ error }}</div>

    <div class="row g-3">
      <div class="col-md-6 col-lg-4" v-for="p in posts" :key="p.id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ p.title }}</h5>
            <p class="card-text text-muted">{{ p.body.substring(0, 120) }}...</p>
            <NuxtLink class="btn btn-primary btn-sm" :to="`/posts/${p.id}`">Xem chi tiết</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/postStore'

const store = usePostStore()
const { items: posts, loading, error } = storeToRefs(store)

// SEO
useHead({
  title: 'Danh sách bài viết | Agency Demo',
  meta: [
    { name: 'description', content: 'Ví dụ dùng Pinia + $fetch để GET bài viết (JSONPlaceholder) trong Nuxt 4.' }
  ]
})

await store.fetchAll()
</script>
