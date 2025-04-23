<template>
  <div class="about-view">
    <h1 class = "about-view__header">Моя История</h1>
    <div class="about-view__timeline">
      <PhotoDescription
        v-for="(item, index) in timeline"
        :key="index"
        :year="item.year"
        :title="item.title"
        :content="item.content"
        :imageSrc="item.imageSrc"
        :imagePosition="item.imagePosition"
        :class="{ 'with-popover': index === 0 }"
      />
    </div>
  </div>
</template>

<script>
import { timeline } from '../const/CardDataConst.js'
import PhotoDescription from '../components/ui/PhotoDescription.vue'

export default {
  name: 'AboutView',
  components: {
    PhotoDescription
  },
  data() {
    return {
      timeline
    }
  }
}
</script>

<style scoped>
.about-view__header{
  font-weight:800;
  font-size: 64px;
  background: linear-gradient(445deg, rgb(255, 255, 255), rgb(84, 100, 120));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
