<template>
  <div class="header">
    <nav :class="['header-box', { 'header--scrolled': isScrolled }]">
      <router-link class="header-box__logo" to="/">
        <span class="header-box__logo-item">СБ</span>
      </router-link>
      <router-link
        class="header-box__item"
        :class="{ 'active-tab': isActiveRoute('/about') }"
        to="/about"
      >
        Обо мне
      </router-link>
      <div class="header-box__item interests-dropdown" @mouseenter="showDropdown" @mouseleave="hideDropdown">
        <router-link
          class="interests-dropdown__link"
          :class="{ 'active-tab': isActiveRoute('/interests') }"
          to="/interests"
        >
          Мои интересы
        </router-link>
        <ul v-if="isDropdownVisible" class="dropdown-menu">
          <li v-for="(item, index) in interests" :key="index">
            <button @click="scrollToInterest(item.target)">{{ item.header }}</button>
          </li>
        </ul>
      </div>

      <router-link
        class="header-box__item"
        :class="{ 'active-tab': isActiveRoute('/university') }"
        to="/university"
      >
        Учёба
      </router-link>
      <router-link
        class="header-box__item"
        :class="{ 'active-tab': isActiveRoute('/album') }"
        to="/album"
      >
        Фотоальбом
      </router-link>
      <router-link
        class="header-box__item"
        :class="{ 'active-tab': isActiveRoute('/tests') }"
        to="/tests"
      >
        Тест
      </router-link>
      <router-link
        class="header-box__item"
        :class="{ 'active-tab': isActiveRoute('/watch-story') }"
        to="/watch-story"
      >
        История
      </router-link>
    </nav>
  </div>
</template>


<script>
import { interests } from '../../const/CardDataConst.js';

export default {
  name: 'Header',
  data() {
    return {
      isScrolled: false,
      interests,
      isDropdownVisible: false,

    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    isActiveRoute(route) {
      return this.$route.path.startsWith(route);
    },
    showDropdown() {
      this.isDropdownVisible = true;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
    scrollToInterest(targetId) {
      this.$router.push('/interests').then(() => {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            const headerHeight = document.querySelector('.header-box').offsetHeight; // Получаем высоту хедера
            const offsetPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 100);
      });
    }
  },
};
</script>

<style scoped>
.header-box {
  position: fixed;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: center;
  text-decoration: none;
  z-index: 1000;
  backdrop-filter: none;
  background-color: transparent;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}
.header-box.header--scrolled {
  background-color: rgba(21, 26, 32, 0.5);
  backdrop-filter: blur(10px);
}
.header-box__logo-item {
  font-weight: 800;
  background: linear-gradient(445deg, rgb(255, 255, 255), rgb(84, 100, 120));
  -webkit-background-clip: text;
  background-clip: text;
  font-size: 32px;
  color: transparent;
}
.header-box__item {
  position: relative;
  text-decoration: none;
  font-size: 18px;
}
.header-box__item:hover::after,
.header-box__item.active-tab::after {
  content: '';
  width: 100%;
  transition: width 0.3s ease;
}
.header-box__item::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0%;
  height: 1px;
  background-color: ghostwhite;
  transition: width 0.3s ease;
}

.header-box a {
  text-decoration: none;
  color: ghostwhite;
  font-weight: 300;
}
.header-box__logo {
  padding-right: 150px;
}
.active-tab {
  font-weight: bold;
  color: ghostwhite;
}
.interests-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  min-width: 200px;
  left: 0;
  background-color: rgba(40, 44, 52, 0.95); /* Небольшая темная прозрачность */
  border-radius: 8px;
  padding: 12px 16px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* Добавим тень для объема */
  z-index: 100;
}

.interests-dropdown:hover .dropdown-menu {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-menu li {
  text-align: left;
}

.dropdown-menu button {
  text-decoration: none;
  color: #f0f0f0;
  font-size: 14px;
  padding: 6px 12px;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 400;
}

.dropdown-menu button:hover {
  background-color: rgba(70, 130, 180, 0.3);
  border-radius: 4px;
}
.interests-dropdown__link.active-tab::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ghostwhite;
  transition: width 0.3s ease;
}

</style>
