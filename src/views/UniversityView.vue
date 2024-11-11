<template>
  <div class="university-view">
    <h1>Учёба</h1>
    <div class="university-view__info">
      <CardData
        v-for="(item, index) in cardDataUniversity"
        :key="index"
        :centerContent="false"
        :formatContent="true"
        :header="item.title"
        :content="item.content"
        :headerIcon="item.icon"
      />
    </div>
    <h3>Изучаемые дисциплины</h3>
    <Table />
    <div class="button-container">
      <router-link class="animated-button" to="/tests">Пройти тест</router-link>
    </div>
  </div>
</template>

<script>
import CardData from '../components/ui/CardData.vue'
import { cardDataUniversity } from '../const/CardDataConst.js'
import Table from '../components/ui/Table.vue'

export default {
  components: {
    CardData,
    Table,
  },
  data () {
    return {
      cardDataUniversity
    }
  },
}
</script>

<style scoped>
.university-view{
  text-align: left;
}

::v-deep .card-data{
  border: none;
  padding: 0px;
  margin: 30px;
}

.university-view__info{
  background-color: rgb(14, 17, 21);
  border-radius: 10px;
  margin: 30px;
  width: 100%;
}

h3{
  margin-top: 5%;
  margin-bottom: 5%;
  background: linear-gradient(445deg, rgb(255, 255, 255), rgb(84, 100, 120));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  align-self: flex-start;
}

.button-container {
  text-align: center;
  margin-bottom: 5%;
}

.animated-button {
  padding: 15px 30px;
  background-color: #00bfff;
  border-radius: 15px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
  color: inherit;
  font-weight: 500;
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.5); /* Мягкое свечение */
}

.animated-button::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  z-index: 1;
  opacity: 0;
  transition: all 0.3s ease;
}

.animated-button:hover {
  background-color: #1e90ff;
  box-shadow: 0 0 30px rgba(0, 191, 255, 0.8);
}

.animated-button:hover::after {
  opacity: 1;
  transform: scale(1.05);
}

.animated-button:focus {
  outline: none;
}

</style>
