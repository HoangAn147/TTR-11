<template>
  <section class="wrapper bg-gradient-primary">
    <div class="container pt-12 pt-lg-8 pb-14 pb-md-17">
      <div class="row text-center">
        <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          <h2 class="fs-16 text-uppercase text-primary mb-3">What We Do?</h2>
          <h3 class="display-3 mb-10 px-xxl-10">
            The service we offer is specifically designed to meet your needs.
          </h3>
        </div>
      </div>

      <div class="row gx-lg-8 gx-xl-12 gy-11 px-xxl-5 text-center d-flex align-items-end">
        <div v-if="store.loading" class="text-center py-10 w-100">
          <p>Loading data from Supabase...</p>
        </div>

        <div v-else-if="store.error" class="text-danger w-100">
          <p>{{ store.error }}</p>
        </div>

        <div v-else v-for="section in store.items" :key="section.id" class="col-lg-4">
          <div class="px-md-15 px-lg-3">
            <figure class="mb-6">
              <img
                  class="img-fluid"
                  :src="resolveImage(section.image_url)"
                  :alt="section.title"
              />
            </figure>
            <h3>{{ section.title }}</h3>
            <p class="mb-2">{{ section.description }}</p>
            <a href="#" class="more hover">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

defineOptions({
  name: 'Whatwedo'
})

import { onMounted } from 'vue'
import { useItemStore } from '@/stores/useItemStore'

const store = useItemStore()
const SUPABASE_URL = import.meta.env.NUXT_PUBLIC_SUPABASE_URL

onMounted(async () => {
  await store.fetchItems('homepage_items') 
})

function resolveImage(path?: string) {
  const baseUrl = import.meta.env.NUXT_PUBLIC_SUPABASE_URL
  console.log('resolveImage path:', path)

  if (!path || ['noo', 'null', 'undefined'].includes(path)) {
    return new URL('../assets/img/illustrations/i24.png', import.meta.url).href
  }

  if (path.startsWith('http')) return path

  if (path.startsWith('/images/') && baseUrl)
    return `${baseUrl}/storage/v1/object/public${path}`

  return new URL(`../assets/img/illustrations/${path}`, import.meta.url).href
}


</script>