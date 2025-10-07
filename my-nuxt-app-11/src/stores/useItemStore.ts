import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SupabaseClient } from '@supabase/supabase-js'

const ALLOWED_TABLES = ['homepage_sections', 'homepage_items'] as const
type AllowedTable = (typeof ALLOWED_TABLES)[number]

export const useItemStore = defineStore('items', () => {
  const { $supabase } = useNuxtApp()
  const client = $supabase as SupabaseClient | undefined

  const items = ref<any[]>([])
  const item  = ref<any | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const DEFAULT_TABLE: AllowedTable = 'homepage_sections'

  const fetchItems = async (table?: AllowedTable, onlyReturn = false) => {
    if (!client) {
      error.value = 'Supabase client unavailable. Check .env and supabase.client.ts'
      return
    }
    const t = (table ?? DEFAULT_TABLE)
    if (!ALLOWED_TABLES.includes(t)) {
      throw new Error(`Table '${t}' is not allowed.`)
    }

    loading.value = true
    error.value = null
    try {
      const { data, error: supErr } = await client
        .from(t)
        .select('*')
        .order('id', { ascending: true })

      if (supErr) {
        error.value = supErr.message
        return onlyReturn ? [] : (items.value = [])
      }

      if (onlyReturn) return data ?? []
      items.value = data ?? []
    } finally {
      loading.value = false
    }
  }

  const fetchItem = async (id: number, table?: AllowedTable, onlyReturn = false) => {
    if (!client) {
      error.value = 'Supabase client unavailable. Check .env and supabase.client.ts'
      return
    }
    const t = (table ?? DEFAULT_TABLE)
    if (!ALLOWED_TABLES.includes(t)) {
      throw new Error(`Table '${t}' is not allowed.`)
    }

    loading.value = true
    error.value = null
    try {
      const { data, error: supErr } = await client
        .from(t)
        .select('*')
        .eq('id', id)
        .single()

      if (supErr) {
        error.value = supErr.message
        return onlyReturn ? null : (item.value = null)
      }

      if (onlyReturn) return data ?? null
      item.value = data ?? null
    } finally {
      loading.value = false
    }
  }

  return { items, item, error, loading, fetchItems, fetchItem }
})
