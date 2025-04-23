<template>
  <div v-if="visible" class="error-notification">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      // Сохраняем текущую позицию прокрутки
      const scrollTop = window.scrollY;

      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 6000); // Полное время видимости (3 сек "висения" + 3 сек затухания)

      // Возвращаемся к сохранённой позиции после показа модалки
      window.scrollTo(0, scrollTop);
    },
  },
};
</script>

<style scoped>
@keyframes fadeSlide {
  0% {
    opacity: 0;
    transform: translate(-50%, -20px); /* Начальный сдвиг сверху */
  }
  10% {
    opacity: 1;
    transform: translate(-50%, 0); /* Фиксируем на месте после входа */
  }
  70% {
    opacity: 1; /* "Висит" на экране без изменений */
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 0); /* Убираем сдвиг вверх при исчезновении */
  }
}

.error-notification {
  position: fixed;
  top: 5vh; /* Расстояние от верхнего края видимой области */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(232, 100, 100, 0.9); /* Полупрозрачный красный */
  color: white;
  padding: 15px 30px;
  border-radius: 10px; /* Округленные края */
  font-size: 18px;
  text-align: center; /* Центрирование текста */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: fadeSlide 6s ease forwards; /* Полный цикл анимации 6 секунд */
}
</style>
