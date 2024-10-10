<template>
  <div class="selector-wrapper">
    <label>{{ label }}</label>
    <select v-model="localValue" @change="handleSelection($event.target.value)">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    options: Array,
    value: String,  // Значение для v-model, привязано к родительскому
  },
  data() {
    return {
      localValue: this.value || null, // Дефолтное значение
    };
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    },
  },
  methods: {
    handleSelection(option) {
      if (option) {
        this.localValue = option;
        this.$emit('input', option);  // Передаем выбранное значение в родителя
        this.$emit('inputFilled', true);  // Сообщаем, что выбор сделан
        this.$emit('updateAnswer', option);  // Передаём данные в родителя
      } else {
        this.$emit('inputFilled', false);  // Если данные пусты, передаем false
      }
    },
  },
};
</script>

<style scoped>
.selector-wrapper {
  margin: 10px 0 20px 0;
  width: 100%;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #1b1f26;
  color: white;
}
</style>
