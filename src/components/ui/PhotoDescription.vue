<template>
  <div class="photo-description" :class="{'reverse-layout': imagePosition === 'right'}">
    <div class="photo-description__image">
      <img
        :src="imageSrc"
        alt="Image Description"
        @mouseenter="showPopover"
        @mouseleave="hidePopover"
      >
      <div class="popover" ref="popover">
        <p>Архангел Михаил</p>
      </div>
    </div>
    <div class="photo-description__content">
      <h2>{{ year }}</h2>
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  </div>
</template>


<script>
import $ from 'jquery';

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
  },
  mounted() {
    $(this.$refs.popover).hide();
  },
  methods: {
    showPopover() {
      $(this.$refs.popover).stop(true, true).fadeIn(300);
    },
    hidePopover() {
      setTimeout(() => {
        $(this.$refs.popover).stop(true, true).fadeOut(300);
      }, 1000);
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
  position: relative;
}

.photo-description.reverse-layout {
  flex-direction: row-reverse;
}

.photo-description__image img {
  width: 400px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  position: relative;
}
.photo-description__content{
  margin: 80px;
}
.popover {
  position: absolute;
  top: 50%;
  left: 100%; /* Расположение справа от картинки */
  transform: translateY(-50%) translateX(20px); /* Смещение немного вправо */
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 10;
  display: none;
  text-align: center; /* Центрирование текста */
  font-size: 16px;
  width: 150px; /* Ширина popover */
}
</style>
