<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <div>
    <h1>Debug runtimeConfig</h1>
    <pre>{{ config.public }}</pre>
  </div>
</template>
