<template>
  <div class="interests-view">
    <h1 class="interests-view__header" >Мои Интересы</h1>
    <transition name="fade">
      <CardLinks></CardLinks>
    </transition>
    <transition name="fade">
      <div  class="interests-view__list">
        <CardData
          v-for="(item, index) in interests"
          :key="index"
          :id="item.target"
          :header="item.header"
          :content="item.content"
          :centerContent="false"
          :showArrow="true"
        />
      </div>
    </transition>
  </div>
</template>


<script>
import CardData from '../components/ui/CardData.vue'
import CardLinks from "../components/ui/CardLinks.vue"
import { interests } from '../const/CardDataConst.js'

export default {
  name: 'InterestsView',
  components: {
    CardData,
    CardLinks
  },
  data() {
    return {
      interests,
    }
  },
}
</script>

<style scoped>
/* Анимация появления и исчезновения */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px); /* Немного выше при появлении */
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}



/* Стили для наведения на "Мои Интересы" */
.interests-view__header {
  cursor: pointer;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.interests-view__header:hover {
  color: lightskyblue; /* Нежный голубой цвет при наведении */
  text-shadow: 0px 0px 8px rgba(0, 191, 255, 0.5); /* Легкая подсветка */
}

/* Стили для списка */
.interests-view__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

::v-deep .card-data {
  border: none;
  line-height: 3;
  margin: 70px;
}
</style>
