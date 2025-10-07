<script setup lang="ts">
import { onMounted } from 'vue'
import { useItemStore } from '@/stores/useItemStore'

const itemStore = useItemStore()

useHead({
  title: 'Items | Supabase Demo',
  meta: [{ name: 'description', content: 'Danh sách items lấy từ Supabase' }]
})

onMounted(() => {
  itemStore.fetchItems()
})
</script>

<template>
  <div class="container py-5">
    <h1 class="mb-3">Items (Supabase)</h1>

    <div v-if="itemStore.loading">Loading...</div>
    <div v-else-if="itemStore.error" class="text-danger">{{ itemStore.error }}</div>

    <ul v-else class="list-unstyled">
      <li v-for="i in itemStore.items" :key="i.id" class="mb-2">
        {{ i.name || i.title || i.id }}
      </li>
    </ul>
  </div>
</template>
