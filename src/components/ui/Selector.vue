<template>
  <div class="selector-wrapper">
    <label>{{ label }}</label>
    <select v-model="localValue" @change="checkInput">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    options: Array,
    value: String,  // Привязка v-model
  },
  computed: {
    localValue: {
      get() {
        return this.value;  // Получаем текущее значение
      },
      set(val) {
        this.$emit('input', val);  // Отправляем новое значение наверх
      },
    },
  },
  methods: {
    checkInput() {
      if (this.localValue !== '') {
        this.$emit('inputFilled', true);  // Если данные введены, передаём флаг
      } else {
        this.$emit('inputFilled', false); // Если данные пусты, передаём false
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
