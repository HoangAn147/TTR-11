<template>
  <div
    class="progress-wrap"
    :class="{ 'active-progress': isVisible }"
    @click="goTop"
  >
    <svg class="progress-circle svg-content" viewBox="-1 -1 102 102">
      <path
        :style="{
          strokeDasharray: `${circumference}, ${circumference}`,
          strokeDashoffset: dashOffset
        }"
        d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
const r = 49
const circumference = 2 * Math.PI * r
const dashOffset = ref(circumference)
const isVisible = ref(false)

const update = () => {
  const doc = document.documentElement
  const total = doc.scrollHeight - doc.clientHeight
  const y = doc.scrollTop
  const p = total > 0 ? y / total : 0
  dashOffset.value = circumference * (1 - p)
  isVisible.value = y > 60
}

onMounted(() => {
  const handler = () => requestAnimationFrame(update)
  window.addEventListener('scroll', handler, { passive: true })
  window.addEventListener('resize', handler)
  update()
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handler)
    window.removeEventListener('resize', handler)
  })
})

const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>
