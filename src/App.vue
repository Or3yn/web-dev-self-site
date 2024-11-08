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
      const page = this.$route.path;

      // Загружаем данные истории сеанса из localStorage
      let sessionHistory;
      try {
        sessionHistory = JSON.parse(localStorage.getItem('sessionHistory')) || {};
        if (typeof sessionHistory !== 'object' || sessionHistory === null) {
          sessionHistory = {}; // Инициализируем как пустой объект, если данные не объект
        }
      } catch (e) {
        sessionHistory = {}; // Если ошибка, инициализируем как пустой объект
      }

      // Загружаем данные общей истории из cookies
      let allTimeHistory;
      try {
        allTimeHistory = JSON.parse(getCookie('allTimeHistory') || '{}');
        if (typeof allTimeHistory !== 'object' || allTimeHistory === null) {
          allTimeHistory = {}; // Инициализируем как пустой объект, если данные не объект
        }
      } catch (e) {
        allTimeHistory = {}; // Если ошибка, инициализируем как пустой объект
      }

      // Увеличиваем счетчики для текущей страницы
      sessionHistory[page] = (sessionHistory[page] || 0) + 1;
      allTimeHistory[page] = (allTimeHistory[page] || 0) + 1;

      // Сохраняем обновленные данные
      localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
      setCookie('allTimeHistory', JSON.stringify(allTimeHistory), 365); // Преобразуем объект в строку перед установкой куки, срок - 1 год
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
