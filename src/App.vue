<template>
  <div>
    <Header />
    <router-view class ="content"/>
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
.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 300px 0 300px;
}
</style>
