<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input
      v-if="!textarea"
      v-model="localValue"
    :type="type"
    :placeholder="placeholder"
    @input="checkInput"
    />
    <textarea v-else v-model="localValue" :placeholder="placeholder" @input="checkInput"></textarea>
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
  computed: {
    localValue: {
      get() {
        return this.value;  // Получаем текущее значение из родителя
      },
      set(val) {
        this.$emit('input', val);  // Передаем новое значение в родителя через v-model
      },
    },
  },
  methods: {
    checkInput() {
      if (this.localValue !== '') {
        this.$emit('inputFilled', true);  // Если данные введены, передаём флаг
        this.$emit('updateAnswer', this.localValue);  // Передаём данные в родителя
      } else {
        this.$emit('inputFilled', false); // Если данные пусты, передаём false
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
  width: 100%; /* Ширина на 100% от родительского контейнера */
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #1b1f26;
  color: white;
  box-sizing: border-box; /* Учитываем padding и границы */
}
</style>
