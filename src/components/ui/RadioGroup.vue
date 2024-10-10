<template>
  <div class="radio-group-wrapper">
    <label>{{ label }}</label>
    <div class="radio-options">
      <div v-for="option in options" :key="option" class="radio-option">
        <input
          type="radio"
          :id="option"
          :value="option"
          :checked="selectedValue === option"
          @change="handleSelection(option)"
        />
        <label :for="option">{{ option }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    options: Array,
    value: String,
  },
  data() {
    return {
      selectedValue: this.value || null, // Дефолтное значение или null
    };
  },
  watch: {
    value(newVal) {
      this.selectedValue = newVal;
    },
  },
  methods: {
    handleSelection(option) {
      if (this.selectedValue === option) {
        this.selectedValue = null; // Снимаем выбор, если нажали на ту же кнопку
        this.$emit('input', null);
        this.$emit('inputFilled', false); // Сообщаем, что нет выбранного значения
      } else {
        this.selectedValue = option; // Устанавливаем новое значение
        this.$emit('input', option);
        this.$emit('inputFilled', true); // Сообщаем, что выбор сделан
        this.$emit('updateAnswer', option);  // Передаём данные в родителя
      }
    },
  },
};
</script>

<style scoped>
.radio-group-wrapper {
  margin: 10px 0 20px 0;
}

.radio-options {
  display: flex;
  flex-direction: column;
}

.radio-option {
  margin-bottom: 10px;
}

input[type="radio"] {
  margin-right: 10px;
}
</style>
