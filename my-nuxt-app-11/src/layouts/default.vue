<template>
  <div>
    <Navbar />
    <Navbarcollapse />
    <main>
      <slot />
    </main>
    <Footer />
    <ProgressWrap />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Navbarcollapse from '../components/Navbarcollapse.vue';
import ProgressWrap from '../components/ProgressWrap.vue';
export default {
  components: { Navbar, Footer }
}
</script>