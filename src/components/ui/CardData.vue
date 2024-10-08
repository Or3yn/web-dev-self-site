<template>
  <div class="card-data" :style="{ display: centerContent ? 'flex' : 'block', textAlign: centerContent ? 'center' : 'left' }">
    <p class="card-data__header">{{ header }}</p>
    <div class="card-data__content">
      <span v-for="(sentence, index) in formattedContent" :key="index" class="sentence">
        <img v-if="showArrow" :src="arrow" class="arrow-icon" alt="arrow icon" />
        {{ sentence.trim() }}<br />
      </span>
    </div>
  </div>
</template>


<script>
import arrow from '../../assets/icons/arrow.png';

export default {
  name: 'CardData',
  props: {
    header: {
      type: String,
      default: 'ЛАБОРАТОРНАЯ РАБОТА №1',
    },
    content: {
      type: String,
      default: 'Исследование возможностей языка разметки гипертекстов HTML и каскадных таблиц стилей CSS',
    },
    centerContent: {
      type: Boolean,
      default: true
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    formatContent: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    formattedContent() {
      return this.content.split('.').map(sentence => sentence + '.').filter(sentence => sentence.trim() !== '.');
    }
  },
  data() {
    return {
      arrow,
    }
  },
}
</script>

<style scoped>
.card-data {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid white;
  border-radius: 10px;
  padding: 40px;
  background-color: rgb(14, 17, 21);
}
.card-data__header {
  font-weight: 700;
  font-size: 24px;
}
.sentence {
  display: inline;
}
.arrow-icon {
  width: 12px;
  height: 12px;
  margin-right: 5px;
}
</style>