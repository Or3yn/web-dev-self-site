<template>
  <div class="selector-wrapper">
    <label>{{ label }}</label>
    <select v-model="localValue" @change="checkInput">  <!-- Используем v-model для передачи данных -->
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
  computed: {
    localValue: {
      get() {
        return this.value;  // Получаем значение из родителя
      },
      set(val) {
        this.$emit('input', val);  // Передаем новое значение в родителя через v-model
      },
    },
  },
  methods: {
    checkInput() {
      if (this.localValue !== '') {
        this.$emit('inputFilled', true);  // Если данные введены, передаем флаг true
        this.$emit('updateAnswer', this.localValue);  // Передаём данные в родителя
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
