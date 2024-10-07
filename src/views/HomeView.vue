<template>
  <div class="home-view">
    <section class="home-view__about">
      <img :src="authorImage" alt="Author Image" class="home-view__about__image">
      <h1 class ="home-view__about__author-name">
        <span v-for="(letter, index) in authorFioArray" :key="index" class="letter">{{ letter }}</span>
      </h1>
      <p class = "home-view__about__author-group"> {{ authorGroup }}</p>
      <CardData>
        :header=cardHeader
        :content=cardContent
      </CardData>
    </section>
    <section class="home-view__skills">
      <Tags />
    </section>
  </div>
</template>

<script>
import authorImage from '../assets/images/author.png'
import CardData from '../components/ui/CardData.vue'
import Tags from '../components/ui/Tags.vue'

export default {
  name: 'HomeView',
  components: {
    CardData,
    Tags
  },
  computed: {
    authorFioArray() {
      return this.authorFio.split('');
    }
  },
  data() {
    return {
      authorImage,
      authorFio: `Богданова София Дмитриевна`,
      authorGroup: `ПИ/б-22-1-о`,
      cardHeader: String,
      cardContent: String,
    }
  }
}
</script>

<style scoped>
.home-view{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  row-gap: 30px;
}
.home-view__about{
  display: flex;
  justify-content: center;
  row-gap: 40px;
  align-items: center;
  flex-direction: column;
  margin-top: 17%;
}
.letter {
  transition: color 0.1s ease, text-shadow 0.3s ease;
  cursor: pointer;
}
.letter:hover {
  color: #fff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}
.home-view__about__image{
  width: 300px;
  height: 300px;
  border-radius: 50%;
}
.home-view__about__author-name{
  font-size: 60px;
  background: linear-gradient(445deg, rgb(255, 255, 255), rgb(84, 100, 120));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.home-view__about__author-group{
  font-size: 24px;
}
.home-view__skills{
  margin-top: 10%;
  margin-bottom: 5%;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>