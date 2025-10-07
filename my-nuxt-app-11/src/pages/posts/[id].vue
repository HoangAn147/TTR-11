<template>
  <section class="container py-5">
    <NuxtLink to="/posts" class="btn btn-link p-0 mb-3">← Quay lại</NuxtLink>

    <div v-if="pending">Đang tải...</div>
    <div v-else-if="error" class="text-danger">
      Lỗi: {{ (error as any)?.message || error }}
    </div>

    <article v-else-if="post">
      <h1 class="mb-3">{{ post.title }}</h1>
      <p class="lead">{{ post.body }}</p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/useApi'

interface Post {
  userId?: number
  id?: number
  title: string
  body: string
}

const route = useRoute()
const { $api } = useApi()

definePageMeta({
  key: (r) => r.fullPath
})

const id = computed(() => Number(route.params.id))

const {
  data: post,
  pending,
  error,
  refresh
} = await useAsyncData<Post | null>(
  () => `post-${id.value}`,
  () => $api<Post>(`/posts/${id.value}`),
  { default: () => null }
)

watchEffect(() => {
  useHead({
    title: post.value ? `${post.value.title} | Agency Demo` : 'Bài viết | Agency Demo',
    meta: [
      { name: 'description', content: post.value?.body || 'Chi tiết bài viết' }
    ]
  })
})

watchEffect(() => {
  if (!Number.isNaN(id.value)) refresh()
})
</script>
