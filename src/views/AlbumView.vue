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
        @click="openLightbox(index)"
        :class="{ 'hovered': hover === index }"
      >
        <img :src="photo.imageSrc" class="album-view__image" />
        <div class="album-view__overlay">
          <p class="album-view__caption">{{ photo.title }}</p>
        </div>
      </div>
    </div>
    <div v-if="lightboxActive" class="lightbox">
      <div class="lightbox__content">
        <img :src="photos[currentIndex].imageSrc" class="lightbox__image"  alt=""/>
        <p class="lightbox__caption">{{ photos[currentIndex].title }}</p>
        <img
          src="../assets/icons/clear.png"
          class="lightbox__close"
          @click="closeLightbox"
          alt="Close"
        />
        <img
          src="../assets/icons/right-arrow.png"
          class="lightbox__arrow lightbox__arrow--right"
          @click="nextPhoto"
          alt="Next"
        />
        <img
          src="../assets/icons/right-arrow.png"
          class="lightbox__arrow lightbox__arrow--left"
          @click="prevPhoto"
          alt="Previous"
        />
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
      lightboxActive: false,
      currentIndex: 0,
    };
  },
  methods: {
    openLightbox(index) {
      this.currentIndex = index;
      this.lightboxActive = true;
    },
    closeLightbox() {
      this.lightboxActive = false;
    },
    nextPhoto() {
      this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    },
    prevPhoto() {
      this.currentIndex =
        (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    },
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
  filter: grayscale(50%);
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

/* Lightbox styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox__content {
  position: relative;
  width: 60%;
  max-width: 600px;
  text-align: center;
}

.lightbox__image {
  width: 100%;
  border-radius: 10px;
}

.lightbox__caption {
  color: #fff;
  margin-top: 10px;
  font-size: 1.2em;
}

.lightbox__close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px; /* Increased size */
  height: 50px;
  cursor: pointer;
  z-index: 1100; /* Ensure it’s above other elements */
  overflow: visible;
}


.lightbox__arrow {
  position: absolute;
  top: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: white; /* Белый фон под стрелкой */
  border-radius: 50%; /* Создаем круг */
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%); /* Центрируем по вертикали */
}

.lightbox__arrow--right {
  right: -150px;
}

.lightbox__arrow--left {
  transform: scaleX(-1);
  left: -150px;
}
</style>
