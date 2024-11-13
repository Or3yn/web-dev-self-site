<template>
  <div class="calendar-overlay" @click.self="closeCalendar">
    <div class="calendar-container">
      <div class="calendar-header">
        <button class="calendar-nav-button" @click="changeMonth(-1)">‹</button>
        <span class="calendar-month">{{ months[currentMonth] }}</span>
        <select class="calendar-year-selector" v-model="currentYear" @change="updateDaysInMonth">
          <option v-for="year in yearsRange" :key="year" :value="year">{{ year }}</option>
        </select>
        <button class="calendar-nav-button" @click="changeMonth(1)">›</button>
      </div>
      <div class="calendar-grid">
        <span v-for="day in days" :key="day" class="calendar-day">{{ day }}</span>
        <div
          v-for="(date, index) in daysInMonth"
          :key="index"
          :class="['calendar-date', { 'calendar-date--selected': isSelected(date) }]"
          @click="selectDate(date)"
        >
          <span v-if="date">{{ date }}</span>
        </div>
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
      yearsRange: Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i),
    }
  },
  computed: {
    daysInMonth() {
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay() || 7;
      const daysInCurrentMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const daysArray = Array(firstDayOfMonth - 1).fill(null).concat(Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1));
      return daysArray;
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
      this.selectedDate = formattedDate;
      this.$emit("selectDate", formattedDate);
      this.closeCalendar();
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
    updateDaysInMonth() {
      this.daysInMonth;
    }
  },
}
</script>

<style scoped>
.calendar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7); /* Slightly darker overlay for emphasis */
}

.calendar-container {
  background-color: #252930; /* Darker tone for a polished look */
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  height: 450px;
  z-index: 1001;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  color: #e5e5e5; /* Light font color for contrast */
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e5e5e5;
  margin-bottom: 15px;
}

.calendar-month {
  font-weight: bold;
  font-size: 1.2em;
}

.calendar-year-selector {
  background-color: #3a3f4b;
  color: #e5e5e5;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  outline: none;
  font-size: 0.9em;
}

.calendar-nav-button {
  background: none;
  border: none;
  color: #e5e5e5;
  font-size: 1.5em;
  cursor: pointer;
}

.calendar-nav-button:hover {
  color: #00bfff; /* Light blue on hover for visibility */
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  text-align: center;
  font-weight: bold;
  color: #bbbbbb; /* Slightly muted tone */
}

.calendar-date {
  text-align: center;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.calendar-date:hover {
  background-color: #3a3f4b; /* Darker hover effect */
}

.calendar-date--selected {
  background-color: #00bfff;
  color: white;
  border-radius: 50%;
}
</style>
