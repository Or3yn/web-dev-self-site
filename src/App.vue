<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/layout/Footer.vue'
import Header from './components/layout/Header.vue'


export default {
  name: 'App',
  components: {
    Footer,
    Header,
  }
}
</script>

<style scoped>
</style>
