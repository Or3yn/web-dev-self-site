<template>
  <div class="home-view">
    <img :src="authorImage" alt="Author Image" class="home-view__image">
  </div>
</template>

<script>
import authorImage from '../assets/images/author.png'

export default {
  name: 'HomeView',
  data() {
    return {
      authorImage
    }
  }
}
</script>

<style scoped>
.home-view{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.home-view__image{
  width: 300px;
  height: 300px;
  border-radius: 50%;
}
</style>