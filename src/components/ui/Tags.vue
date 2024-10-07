<template>
  <h1 class="tags__header">Стек</h1>
  <div class="tags__items">
    <p class="tags__item" v-for="tag in tags()" :key="tag">{{ tag }}</p>
  </div>
</template>

<script>
import { tags } from '../../const/TagsConst.js'

export default {
  name: 'Tags',
  methods: {
    tags() {
      return tags;
    }
  }
}
</script>

<style scoped>
.tags__header {
  font-size: 32px;
  background: linear-gradient(445deg, rgb(255, 255, 255), rgb(84, 100, 120));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.tags__items {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
}

.tags__item {
  background-color: rgb(14, 17, 21);
  padding: 20px;
  border-radius: 30px;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.tags__item:hover {
  transform: scale(1.1);
  background-color: rgb(255, 255, 255);
  color: rgb(14, 17, 21);
}
</style>
