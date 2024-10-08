<template>
  <div class="card-links-container">
    <div class="card-links">
      <div
        v-for="(link, index) in links"
        :key="index"
        class="card-link"
        @click="scrollToSection(link.target)"
        @mouseover="hover = index"
        @mouseleave="hover = null"
        :class="{ 'hover-highlight': hover === index }"
      >
        <img :src="link.icon" alt="icon" class="card-link__icon" />
        <p class="card-link__text">{{ link.header }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { linksIcons } from '../../const/CardLinksConst.js'

export default {
  name: 'CardLinks',
  data() {
    return {
      hover: null,
      links: linksIcons
    };
  },
  methods: {
    scrollToSection(targetId) {
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        const headerOffset = 100
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

      }
    }
  }
}
</script>

<style scoped>
.card-links-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
.card-links {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.card-link {
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  border-radius: 50px;
}
.card-link__icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  filter: grayscale(100%);
  transition: filter 0.3s;
}
.card-link__text {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
}
.card-link:hover .card-link__icon {
  filter: none;
}
.hover-highlight {
  box-shadow: 0 0 20px 10px rgba(41, 136, 255, 0.46);
}
.highlight {
  box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.7);
  transition: box-shadow 0.3s;
}
</style>
