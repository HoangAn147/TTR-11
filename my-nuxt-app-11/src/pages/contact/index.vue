<template>
  <section class="container py-5">
    <h1 class="mb-4">Liên hệ (POST)</h1>
    <form class="row gy-3" @submit.prevent="onSubmit">
      <div class="col-md-6">
        <label class="form-label">Họ tên</label>
        <input v-model="form.name" type="text" class="form-control" required />
      </div>
      <div class="col-md-6">
        <label class="form-label">Email</label>
        <input v-model="form.email" type="email" class="form-control" required />
      </div>
      <div class="col-12">
        <label class="form-label">Nội dung</label>
        <textarea v-model="form.message" class="form-control" rows="4" required></textarea>
      </div>
      <div class="col-12 d-flex align-items-center gap-3">
        <button class="btn btn-primary" type="submit" :disabled="loading">Gửi</button>
        <span v-if="loading">Đang gửi...</span>
      </div>
    </form>

    <div class="mt-4" v-if="result">
      <h5>Kết quả:</h5>
      <pre class="bg-light p-3 rounded">{{ result }}</pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useApi } from '@/composables/useApi'

useHead({
  title: 'Liên hệ | Agency Demo',
  meta: [
    { name: 'description', content: 'Ví dụ POST bằng axios trong Nuxt 4.' }
  ]
})

const { $axios } = useApi()
const form = reactive({ name: '', email: '', message: '' })
const loading = ref(false)
const result = ref('')

async function onSubmit() {
  loading.value = true
  try {
    const { data } = await $axios.post('https://httpbin.org/post', form)
    result.value = JSON.stringify(data, null, 2)
  } catch (e: any) {
    result.value = `Lỗi: ${e?.message ?? e}`
  } finally {
    loading.value = false
  }
}
</script>
