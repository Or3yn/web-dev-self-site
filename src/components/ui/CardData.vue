<template>
  <div class = "card-data">
    <h1>{{ header }}</h1>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'CardData',
  props: {
    header:
      {
        default: `ЛАБОРАТОРНАЯ РАБОТА №1`
      },
    content:
      {
        default: `Исследование возможностей языка разметки гипертекстов HTML и каскадных таблиц стилей CSS`
      }
  }
}
</script>

<style scoped>
.card-data{
  display: flex;
  justify-content: center;
  row-gap: 25px;
  align-items: center;
  flex-direction: column;
  border: 1px solid white;
  border-radius: 10px;
  padding: 35px;
  background-color: rgb(14, 17, 21);
}
</style>