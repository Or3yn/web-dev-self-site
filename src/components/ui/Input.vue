<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input
      v-if="!textarea"
      v-model="localValue"
      :type="type"
      :placeholder="placeholder"
      @input="handleInput($event.target.value)"
    />
    <textarea v-else v-model="localValue" :placeholder="placeholder" @input="handleInput($event.target.value)"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,  // Значение для v-model, привязано к родительскому
    type: {
      type: String,
      default: 'text',
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
  },
  data() {
    return {
      localValue: this.value || '', // Дефолтное значение
    };
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    },
  },
  methods: {
    handleInput(val) {
      console.log('Значение в поле ввода:', val); // Выводим в консоль текущее значение
      if (val !== '') {
        this.localValue = val;
        this.$emit('input', val);  // Передаем новое значение в родителя
        this.$emit('inputFilled', true);  // Сообщаем, что поле заполнено
        this.$emit('updateAnswer', val);  // Передаём данные в родителя
      } else {
        this.$emit('inputFilled', false); // Если поле пустое, сообщаем что оно не заполнено
      }
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  margin: 10px 0 20px 0;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #1b1f26;
  color: white;
  box-sizing: border-box;
}
</style>
