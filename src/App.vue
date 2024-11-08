<template>
  <div class="app-container">
    <Header />
    <CurrentDateTime />
    <ErrorNotification ref="errorNotification" :message="errorMessage" />
    <router-view class="content" />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/layout/Footer.vue';
import Header from './components/layout/Header.vue';
import CurrentDateTime from './components/layout/CurrentDateTime.vue';
import ErrorNotification from './components/ErrorNotification.vue';
import { setCookie, getCookie } from '@/utils/cookieUtils';

export default {
  name: 'App',
  components: {
    Footer,
    Header,
    CurrentDateTime,
    ErrorNotification
  },
  data() {
    return {
      errorMessage: ''
    };
  },
  watch: {
    $route() {
      this.logPageView();
    }
  },
  mounted() {
    this.logPageView();
  },
  methods: {
    logPageView() {
      const page = this.$route.name;

      if (!page) {
        console.warn("Undefined route name detected. Skipping page view logging.");
        return;
      }

      let sessionHistory;
      try {
        sessionHistory = JSON.parse(localStorage.getItem('sessionHistory')) || {};
      } catch (e) {
        sessionHistory = {};
        console.error("Error parsing session history from localStorage:", e);
      }

      let allTimeHistory;
      try {
        allTimeHistory = JSON.parse(getCookie('allTimeHistory') || '{}');
      } catch (e) {
        allTimeHistory = {};
        console.error("Error parsing all-time history from cookies:", e);
      }

      // Увеличиваем счётчики для текущего сеанса и за всё время
      sessionHistory[page] = (sessionHistory[page] || 0) + 1;
      allTimeHistory[page] = (allTimeHistory[page] || 0) + 1;

      // Сохраняем обновлённые данные
      localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
      setCookie('allTimeHistory', allTimeHistory, 365); // Сохраняем как JSON в cookies

      console.log("Updated session history:", sessionHistory);
      console.log("Updated all-time history:", allTimeHistory);
    }







  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 300px;
}
</style>
