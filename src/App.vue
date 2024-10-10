<template>
  <div class="app-container">
    <Header />
    <router-view class="content" />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/layout/Footer.vue';
import Header from './components/layout/Header.vue';

export default {
  name: 'App',
  components: {
    Footer,
    Header,
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Контейнер приложения должен занимать минимум 100% высоты экрана */
}

.content {
  flex: 1; /* Основной контент растягивается */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 300px; /* Отступы по бокам */
}
</style>
