<template>
  <div class="watch-story">
    <h1>История текущего сеанса</h1>
    <div class="table-container">
      <table class="styled-table">
        <thead>
        <tr>
          <th v-for="(column, index) in sessionColumns" :key="index">
            {{ column.label }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(visit, index) in sessionHistory"
          :key="visit.page"
          @mouseover="hoverSession = index"
          @mouseleave="hoverSession = null"
          :class="{ 'hover-row': hoverSession === index }"
        >
          <td>{{ visit.page }}</td>
          <td>{{ visit.count }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <h1>История за все время</h1>
    <div class="table-container">
      <table class="styled-table">
        <thead>
        <tr>
          <th v-for="(column, index) in allTimeColumns" :key="index">
            {{ column.label }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(visit, index) in allTimeHistory"
          :key="visit.page"
          @mouseover="hoverAllTime = index"
          @mouseleave="hoverAllTime = null"
          :class="{ 'hover-row': hoverAllTime === index }"
        >
          <td>{{ visit.page }}</td>
          <td>{{ visit.count }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import { setCookie, getCookie } from '@/utils/cookieUtils';

export default {
  name: 'WatchStory',
  data() {
    return {
      sessionHistory: [],
      allTimeHistory: [],
      hoverSession: null,
      hoverAllTime: null,
      sessionColumns: [
        { label: 'Страница' },
        { label: 'Количество посещений' }
      ],
      allTimeColumns: [
        { label: 'Страница' },
        { label: 'Количество посещений' }
      ]
    };
  },
  created() {
    this.loadSessionHistory();
    this.loadAllTimeHistory();
  },
  methods: {
    loadSessionHistory() {
      const sessionData = JSON.parse(localStorage.getItem('sessionHistory') || '{}');
      console.log("Session history data:", sessionData);

      this.sessionHistory = Object.keys(sessionData).map(page => ({
        page,
        count: Number.isInteger(sessionData[page]) ? sessionData[page] : 0
      }));
    },
    loadAllTimeHistory() {
      let allTimeData = getCookie('allTimeHistory') || '{}';
      console.log("Raw all-time history data from cookies:", allTimeData);

      let parsedData;
      try {
        parsedData = JSON.parse(allTimeData);
      } catch (e) {
        console.error("Error parsing all-time data from cookies:", e);
        parsedData = {}; // Если парсинг не удался, задаем пустой объект
      }

      // Преобразуем данные в формат для отображения
      this.allTimeHistory = Object.keys(parsedData).map(page => ({
        page,
        count: Number.isInteger(parsedData[page]) ? parsedData[page] : 0
      }));
    }




  }
};
</script>

<style scoped lang="sass">
// Переменные для цветов и размеров
$base-font-size: 16px
$background-color: #1b1f26
$header-color: #1f242c
$row-even-color: #252b33
$row-hover-color: #2d3440
$highlight-hover-color: rgba(0, 191, 255, 0.2)
$border-color: #2d3440

// Миксин для закругления углов
@mixin border-radius($radius)
  border-radius: $radius

// Миксин для базового стиля ячеек
@mixin cell-style($padding, $align: left)
  padding: $padding
  text-align: $align

// Миксин для таблицы с динамическими размерами
@mixin table-style($width, $font-size: $base-font-size)
  width: $width
  font-size: $font-size
  border-collapse: collapse
  background-color: $background-color
  color: white

// Стили
.watch-story
  margin-bottom: 10%

.table-container
  // Используем миксин для закругления углов
  @include border-radius(10px)
  width: 920px
  margin: auto
  overflow: hidden

.styled-table
  // Применяем миксин для таблицы и увеличиваем размер шрифта на 10%
  @include table-style(100%, $base-font-size * 1.1)

  th, td
    // Используем миксин для ячеек
    @include cell-style(12px 15px)

  th
    background-color: $header-color
    font-weight: 400
    font-size: $base-font-size * 0.875  // Уменьшаем шрифт заголовков на 12.5%
    border-bottom: 2px solid $border-color

  tbody
    tr:nth-of-type(even)
      background-color: $row-even-color

    tr:hover
      background-color: $row-hover-color

  .hover-row
    background-color: $highlight-hover-color
    transition: background-color 0.3s ease

  td
    border-bottom: 1px solid $border-color

  tr:last-child td
    border-bottom: none
</style>
