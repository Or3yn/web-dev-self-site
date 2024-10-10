<template>
  <div class="interests-view">
    <h1 class="interests-view__header">Мои Интересы</h1>
    <CardLinks />
    <div class="interests-view__list">
      <CardData
        v-for="(item, index) in interests"
        :key="index"
        :id="item.target"
        :header="item.header"
        :content="item.content"
        :centerContent="false"
        :showArrow="true"
      />
    </div>
  </div>
</template>

<script>
import CardData from '../components/ui/CardData.vue'
import CardLinks from "../components/ui/CardLinks.vue"
import { interests } from '../const/CardDataConst.js'

export default {
  name: 'InterestsView',
  components: {
    CardData,
    CardLinks
  },
  data() {
    return {
      interests,
    }
  },
}
</script>

<style scoped>
.interests-view__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
::v-deep .card-data{
  border: none;
  line-height: 3;
  margin: 70px;
}
</style>