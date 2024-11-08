<template>
  <div class="calendar-overlay" @click.self="closeCalendar">
    <div class="calendar-container">
      <div class="calendar-header">
        <button @click="changeMonth(-1)">‹</button>
        <span>{{ months[currentMonth] }} {{ currentYear }}</span>
        <button @click="changeMonth(1)">›</button>
      </div>
      <div class="calendar-grid">
        <span v-for="day in days" :key="day" class="calendar-day">{{ day }}</span>
        <button
          v-for="(date, index) in daysInMonth"
          :key="index"
          :class="['calendar-date', { 'calendar-date--selected': isSelected(date) }]"
          @click="selectDate(date)"
        >
          {{ date }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      selectedDate: null,
    }
  },
  computed: {
    daysInMonth() {
      const days = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      return Array.from({ length: days }, (_, i) => i + 1);
    },
  },
  methods: {
    changeMonth(offset) {
      this.currentMonth += offset;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
    },
    selectDate(date) {
      const selectedDate = new Date(this.currentYear, this.currentMonth, date);
      const formattedDate = selectedDate.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      this.selectedDate = formattedDate; // Сохраняем выбранную дату
      this.$emit("selectDate", formattedDate); // Отправляем выбранную дату родителю
      this.closeCalendar(); // Закрыть календарь
    },
    closeCalendar() {
      this.$emit("close");
    },
    isSelected(date) {
      return this.selectedDate &&
        this.selectedDate.getDate() === date &&
        this.selectedDate.getMonth() === this.currentMonth &&
        this.selectedDate.getFullYear() === this.currentYear;
    },
  },
}
</script>

<style scoped>
.calendar-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  right: 50%;
  bottom: 30%;
  display: flex;
  align-items: flex-end; /* Align calendar at the bottom */
  justify-content: center;
  z-index: 1000; /* Ensures it's on top of other components */
}

.calendar-container {
  background-color: #1b1f26;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  z-index: 1001; /* Ensures the container is above overlay */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5), 0 12px 24px rgba(0, 0, 0, 0.3); /* Глубокая тень */}

.calendar-header {
  display: flex;
  justify-content: space-between;
  color: #ddd;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day, .calendar-date {
  text-align: center;
}

.calendar-date--selected {
  background-color: #00bfff;
  border-radius: 50%;
}
</style>