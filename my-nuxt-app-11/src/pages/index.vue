<template>
  <main class="page-index">
    <Header />
    <Whatwedo />
    <Ourstrategy />
    <Whychooseus />
    <Companyfacts />
    <Happycustomers />
    <Faq />
  </main>
</template>

<script>
import Header from "@/components/Header.vue";
import Whatwedo from "@/components/Whatwedo.vue";
export default {
  components: {
    Header,
  },
};
</script>
