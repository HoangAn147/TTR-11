<script setup lang="ts">
import type { SupabaseClient } from '@supabase/supabase-js'

interface HomeSection {
  id: string | number
  title?: string
  created_at?: string
}

const { $supabase } = useNuxtApp()
const supabase = $supabase as SupabaseClient | undefined

const { data, error, pending } = await useAsyncData<HomeSection[]>(
  'homepage_sections',
  async () => {
    if (!supabase) {
      throw new Error('Supabase client unavailable. Check .env and plugin.')
    }
    const { data, error } = await supabase
      .from('homepage_sections')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    if (error) throw error
    return data ?? []
  },
  { default: () => [], server: false }
)
</script>

<template>
  <section class="container py-4">
    <h2 class="mb-3">Homes (Supabase)</h2>
    <div v-if="pending">Đang tải...</div>
    <div v-else-if="error" class="text-danger">Lỗi: {{ error.message }}</div>
    <ul v-else>
      <li v-for="item in data" :key="item.id">
        {{ item.title }}
      </li>
    </ul>
  </section>
</template>
