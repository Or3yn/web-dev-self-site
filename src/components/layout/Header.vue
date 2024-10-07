<template>
  <div class="header">
    <nav :class="['header-box', { 'header--scrolled': isScrolled }]">
      <router-link class="header-box__logo" to="/"><span class="header-box__logo-item">СБ</span></router-link>
      <router-link class="header-box__item" to="/about">Обо мне</router-link>
      <router-link class="header-box__item" to="/interests">Мои интересы</router-link>
      <router-link class="header-box__item" to="/university">Учёба</router-link>
      <router-link class="header-box__item" to="/album">Фотоальбом</router-link>
      <router-link class="header-box__item" to="/tests">Тесты</router-link>
      <router-link class="header-box__item" to="/contacts">Контакты</router-link>
    </nav>
  </div>
</template>

<script>
export default{
  name: 'Header',
  data() {
    return {
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0
    }
  }
}
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
.header-box__logo-item{
  font-weight:800;
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
.header-box__item:hover::after {
  width: 100%;
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
.header-box__logo{
  padding-right: 150px;
}

</style>