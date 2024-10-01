<template>
  <div>
    <Menu />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/layout/Footer.vue'
import Menu from './components/layout/Menu.vue'

export default {
  name: 'App',
  components: {
    Footer,
    Menu
  }
}
</script>

<style scoped>
</style>
