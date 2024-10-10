<template>
  <div class="university-view">
    <div class="table-container">
      <table class="styled-table">
        <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            {{ column.label }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(subject, index) in subjects"
          :key="subject.id"
          @mouseover="hover = index"
          @mouseleave="hover = null"
          :class="{ 'hover-row': hover === index }"
        >
          <td>{{ subject.id }}</td>
          <td>{{ subject.hoursPerWeek }}</td>
          <td>{{ subject.subjectName }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { columnsUniversityView } from '../../const/TableColumns.js'
import { subjects } from '../../fixtures/SubjectsFixture.js'

export default {
  data() {
    return {
      columns: columnsUniversityView,
      subjects: subjects,
      hover: null,
    };
  },
};
</script>

<style scoped>
.university-view {
  margin-bottom: 10%;
}

.table-container {
  width: 920px;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  background-color: #1b1f26;
  color: white;
}

.styled-table th, .styled-table td {
  padding: 12px 15px;
  text-align: left;
}

.styled-table th {
  background-color: #1f242c;
  font-weight: 400;
  font-size: 14px;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #252b33;
}

.styled-table tbody tr:hover {
  background-color: #2d3440;
}

.hover-row {
  background-color: rgba(0, 191, 255, 0.2);
  transition: background-color 0.3s ease;
}

.styled-table td {
  border-bottom: 1px solid #2d3440;
}

.styled-table th {
  border-bottom: 2px solid #2d3440;
}

.styled-table tr:last-child td {
  border-bottom: none;
}
</style>
