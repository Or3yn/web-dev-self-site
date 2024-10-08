<template>
  <div class="photo-description" :class="{'reverse-layout': imagePosition === 'right'}">
    <div class="photo-description__image">
      <img :src="imageSrc" alt="Image Description">
    </div>
    <div class="photo-description__content">
      <h2>{{ year }}</h2>
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoDescription',
  props: {
    year: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    },
    imagePosition: {
      type: String,
      default: 'left',
    }
  }
}
</script>

<style scoped>
.photo-description {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 60px 0;
}

.photo-description.reverse-layout {
  flex-direction: row-reverse;
}

.photo-description__image img {
  width: 400px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}
h2 {
  font-size: 36px;
  margin-bottom: 15px;
  font-weight: 700;
  background: linear-gradient(445deg, rgb(255, 255, 255), rgb(84, 100, 120));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

h3 {
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: 700;
  color: #4fa3e0;
}
.photo-description__content{
  margin: 80px;
}
</style>
