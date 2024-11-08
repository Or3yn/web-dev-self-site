<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input
      v-if="!textarea"
      ref="input"
      v-model="localValue"
      :type="type"
      :placeholder="placeholder"
      @input="handleInput($event.target.value)"
      @focus="handleFocus"
    />
    <textarea
      v-else
      v-model="localValue"
      :placeholder="placeholder"
      @input="handleInput($event.target.value)">
      @focus="handleFocus"
      ref="input"
    </textarea>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: {
      type: String,
      default: '' // Задает значение по умолчанию для props
    },
    type: {
      type: String,
      default: 'text',
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    validationType: String,

  },
  data() {
    return {
      localValue: this.value || '',
    };
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    }
  },
  methods: {
    handleInput(val) {
      if (val !== '') {
        this.localValue = val;
        this.$emit('input', val);
        this.$emit('inputFilled', true);
        this.$emit('updateAnswer', val);
      } else {
        this.$emit('inputFilled', false);
      }
    },
    handleFocus() {
      this.$emit('showCalendar'); // Emit a custom event for parent component
    },
    validate() {
      if (this.validationType === 'fullName') {
        const isValidFullName = this.validateFullName(this.localValue);
        if (!isValidFullName) {
          this.$emit('inputFilled', false);
        }
      } else if (this.validationType === 'phone') {
        const isValidPhone = this.validatePhone(this.localValue);
        if (!isValidPhone) {
          this.$emit('inputFilled', false);
        }
      }
    },
    validateFullName(value) {
      const words = value.trim().split(/\s+/);
      const isValid = words.length === 3;
      return isValid;
    },
    validatePhone(value) {
      const isValid = /^(\+7|\+3)\d{8,10}$/.test(value);
      return isValid;
    },
    focus() {
      this.$refs.input.focus();
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
