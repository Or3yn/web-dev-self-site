<template>
  <div class="album-view">
    <h1 class="album-view__title">Фотоальбом</h1>
    <div class="album-view__grid">
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="album-view__item"
        @mouseover="hover = index"
        @mouseleave="hover = null"
        :class="{ 'hovered': hover === index }"
      >
        <img :src="photo.imageSrc" class="album-view__image" />
        <div class="album-view__overlay">
          <p class="album-view__caption">{{ photo.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { albumPhotos } from '../const/AlbumConst.js'

export default {
  data() {
    return {
      hover: null,
      photos: albumPhotos,
    };
  },
};
</script>

<style scoped>
.album-view {
  text-align: center;
  margin-bottom: 5%;
}

.album-view__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 45px;
}

.album-view__item {
  position: relative;
  width: 250px;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.album-view__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.album-view__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.album-view__caption {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.album-view__item:hover .album-view__image {
  transform: scale(1.05);
  filter: grayscale(50%); /* Полу-затемнение */
}

.album-view__item:hover .album-view__overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.album-view__item:hover .album-view__caption {
  opacity: 1;
}

.album-view__item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  height: 90%;
  border: 2px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.album-view__item:hover::before {
  opacity: 1;
}
</style>
