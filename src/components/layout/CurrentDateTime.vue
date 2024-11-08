<template>
  <div class="current-date-time">
    {{ formattedDateTime }}
  </div>
</template>

<script>
export default {
  name: "CurrentDateTime",
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    formattedDateTime() {
      // Форматируем дату и время: ЧЧ.ММ.ГГ День недели
      const date = this.currentDate;
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2);

      // Получаем день недели и делаем первую букву заглавной
      let weekday = date.toLocaleDateString('ru-RU', { weekday: 'long' });
      weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

      return `${hours}:${minutes}:${seconds} ${day}.${month}.${year} ${weekday}`;
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>


<style scoped>
.current-date-time {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 1000;
}
</style>
