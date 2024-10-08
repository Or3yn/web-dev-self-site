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
  </div>
</template>

<script>
import CardData from '../components/ui/CardData.vue'
import { cardDataUniversity } from '../const/CardDataConst.js'
import Table from '../components/ui/Table.vue'

export default {
  components: {
    CardData,
    Table
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
</style>