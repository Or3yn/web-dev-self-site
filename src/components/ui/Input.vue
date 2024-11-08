<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-wrapper">
      <label>{{ label }}</label>
      <img
        src="@/assets/icons/warn.png"
        alt="Warning"
        class="warn-icon-label"
        :class="{ 'visible': !isValid }"
      />
      <input
        v-if="!textarea"
        ref="input"
        v-model="localValue"
        :type="type"
        :placeholder="placeholder"
        @input="handleInput($event.target.value)"
        @blur="validateOnBlur"
        @focus="handleFocus"
        :class="{ 'input-error': !isValid }"
      />
      <textarea
        v-else
        v-model="localValue"
        :placeholder="placeholder"
        @input="handleInput($event.target.value)"
        @blur="validateOnBlur"
        @focus="handleFocus"
        ref="input"
        :class="{ 'input-error': !isValid }"
      ></textarea>
      <!-- Кнопка очистки, управление видимостью через opacity -->
      <img
        src="@/assets/icons/clear.png"
        alt="Clear"
        class="clear-icon"
        :class="{ 'visible': localValue }"
        @click="clearInput"
      />

      <!-- Сообщение об ошибке для конкретного поля -->
      <p v-if="!isValid" class="error-message">{{ errorMessage }}</p>
    </div>
    <!-- Общее сообщение об ошибке под формой -->
  </form>

</template>



<script>
export default {
  props: {
    label: String,
    value: {
      type: String,
      default: ''
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
      isValid: true,          // Статус валидации поля
      errorMessage: '',       // Сообщение об ошибке для поля
      formErrorMessage: '',   // Общее сообщение об ошибке формы
      formValid: true         // Статус валидации формы
    };
  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    }
  },
  methods: {
    handleInput(val) {
      this.localValue = val;
      this.$emit('input', val);
      this.$emit('inputFilled', !!val);
      this.$emit('updateAnswer', val);
    },
    handleFocus() {
      this.$emit('showCalendar');
    },
    clearInput() {
      this.localValue = '';
      this.isValid = true;
      this.errorMessage = '';
      this.$emit('input', '');
      this.$emit('inputFilled', false);
    },
    handleSubmit() {
      this.validate(); // Вызов валидации формы
      if (!this.formValid) {
        this.formErrorMessage = 'Заполните все поля правильно.';
        return;
      }
      // Обработка отправки формы, если валидация успешна
      this.$emit('formSubmitted', this.localValue);
    },
    validate() {
      // Валидация текущего поля в зависимости от типа
      if (this.validationType === 'fullName') {
        this.isValid = this.validateFullName(this.localValue);
        this.errorMessage = this.isValid ? '' : 'Фамилия Имя Отчество должны содержать три слова.';
      } else if (this.validationType === 'phone') {
        this.isValid = this.validatePhone(this.localValue);
        this.errorMessage = this.isValid ? '' : 'Телефон должен начинаться с +7 или +3 и содержать от 9 до 11 цифр.';
      } else if (this.validationType === 'email') {
        this.isValid = this.validateEmail(this.localValue);
        this.errorMessage = this.isValid ? '' : 'Указан некорректный адрес электронной почты.';
      }
      this.formValid = this.isValid; // Обновление общего статуса валидации формы
      this.$emit('inputFilled', this.isValid);
    },
    validateOnBlur() {
      this.validate();
    },
    validateFullName(value) {
      const words = value.trim().split(/\s+/);
      return words.length === 3;
    },
    validateEmail(value) {
      return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    },
    validatePhone(value) {
      return /^(\+7|\+3)\d{8,10}$/.test(value);
    },
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  position: relative;
  margin: 10px 0 20px 0;
}

label {
  display: inline-flex;
  align-items: center;
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

.input-error {
  border-color: red;
}

/* Иконка ошибки, всегда на месте */
.warn-icon-label {
  margin-left: 8px;
  width: 16px;
  height: 16px;
  opacity: 0; /* Изначально невидима */
  transition: opacity 0.3s ease;
}

.warn-icon-label.visible {
  opacity: 1; /* Делается видимой, если есть ошибка */
}

/* Крестик всегда позиционирован одинаково */
.clear-icon {
  position: absolute;
  top:38px;
  right: 10px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  opacity: 0; /* Невидим по умолчанию */
  transition: opacity 0.3s ease; /* Плавный переход для отображения */
}

.clear-icon.visible {
  opacity: 1; /* Делается видимой при наличии значения */

}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.form-error-message {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}

</style>
