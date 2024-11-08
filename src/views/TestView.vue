<template>
  <div class="test-view">
    <h1 class="test-view__title">Основы программирования и алгоритмические языки</h1>
    <transition name="fade-out" @after-leave="showSubmittedMessage = true">
      <div v-if="!testSubmitted" class="test-view__form-container">
        <div class="test-view__step-container" v-show="currentStep === 1">
          <Input ref="fullName" v-model="formData.fullName"
                 label="Фамилия Имя Отчество"
                 @inputFilled="handleInputFilled('fullName', $event)"
                 @updateAnswer="updateAnswer(0, $event)"
                 validationType="fullName"
          />
          <Selector v-model="formData.group" label="Группа" :options="groups" @inputFilled="handleInputFilled('group', $event)" @updateAnswer="updateAnswer(1, $event)" />
          <RadioGroup v-model="formData.gender" label="Пол" :options="genders" @inputFilled="handleInputFilled('gender', $event)" @updateAnswer="updateAnswer(2, $event)" />
          <Selector v-model="formData.age" label="Возраст" :options="ages" @inputFilled="handleInputFilled('age', $event)" @updateAnswer="updateAnswer(3, $event)" />
          <Input v-model="formData.mail" label="E-mail" type="email" @inputFilled="handleInputFilled('mail', $event)" @updateAnswer="updateAnswer(4, $event)" />
          <Input
            ref="phone"
            v-model="formData.phone"
            label="Телефон"
            @inputFilled="handleInputFilled('phone', $event)"
            @updateAnswer="updateAnswer(5, $event)"
            validationType="phone"
          />
          <Input
            ref="birthdate"
            v-model="formData.birthdate"
            label="Дата рождения"
            @showCalendar="showCalendar = true"
            @inputFilled="handleInputFilled('birthdate', $event)"
          @updateAnswer="updateAnswer(6, $event)"
            :value="formData.birthdate"
          />
          <Calendar v-if="showCalendar" @close="showCalendar = false" @selectDate="setBirthday" />
        </div>
        <div class="test-view__step-container" v-show="currentStep === 2">
          <Selector v-model="formData.question1" label="Что такое алгоритм?" :options="questions1" @inputFilled="handleInputFilled('question1', $event)" @updateAnswer="updateAnswer(5, $event)" />
        </div>
        <div class="test-view__step-container" v-show="currentStep === 3">
          <Input v-model="formData.question2" label="Опишите принципы ООП" textarea @inputFilled="handleInputFilled('question2', $event)" @updateAnswer="updateAnswer(6, $event)" />
        </div>
        <div class="test-view__step-container" v-show="currentStep === 4">
          <RadioGroup v-model="formData.question3" label="Какой оператор используется для цикла?" :options="questions3" @inputFilled="handleInputFilled('question3', $event)" @updateAnswer="updateAnswer(7, $event)" />
        </div>
        <div class="test-view__navigation">
          <button v-if="currentStep > 1" @click="prevStep" class="test-view__button test-view__button--back">Назад</button>
          <button
            v-if="currentStep < 4"
            :disabled="!canProceed"
            :class="['test-view__button', canProceed ? 'test-view__button--active' : 'test-view__button--disabled']"
            @click="nextStep"
          >Далее</button>
          <button
            v-if="currentStep === 4"
            :disabled="!canSubmit"
            :class="['test-view__button', canSubmit ? 'test-view__button--active' : 'test-view__button--disabled']"
            @click="submitTest"
          >Отправить</button>
        </div>
      </div>
    </transition>
    <transition name="fade-in">
      <div v-if="showSubmittedMessage" class="test-view__submitted-message">
        {{ submissionFailed ? "Ответы не отправлены, указана несуществующая почта" : "Ответы отправлены" }}
      </div>
    </transition>
  </div>
</template>

<script>
import Input from '../components/ui/Input.vue'
import Selector from '../components/ui/Selector.vue'
import RadioGroup from '../components/ui/RadioGroup.vue'
import Calendar from '../components/Calendar.vue'
import { sendTestData } from '../services/emailService'
export default {
  components: {
    Input,
    Selector,
    RadioGroup,
    Calendar,
  },
  data() {
    return {
      currentStep: 1,
      submissionFailed: false,
      showCalendar: false,
      testSubmitted: false,
      showSubmittedMessage: false,
      formData: {
        fullName: '',
        birthdate: '',
        phone: '',
        group: '',
        gender: '',
        age: '',
        mail: '',
        question1: '',
        question2: '',
        question3: '',
      },
      testResult: [],
      inputsFilled: {
        fullName: false,
        group: false,
        gender: false,
        phone: false,
        age: false,
        mail: false,
        birthdate: false,
        question1: false,
        question2: false,
        question3: false,
      },
      groups: ['101', '102', '103'],
      genders: ['Мужской', 'Женский'],
      ages: Array.from({ length: 60 }, (_, i) => i + 18),
      questions1: ['Шаги, выполняемые последовательно', 'Условное выражение', 'Функция'],
      questions3: ['for', 'if', 'switch', 'while'],
    }
  },
  mounted() {
    // Добавляем глобальный слушатель для Enter
    window.addEventListener('keydown', this.handleEnterKey);
  },
  beforeDestroy() {
    // Убираем слушатель при удалении компонента
    window.removeEventListener('keydown', this.handleEnterKey);
  },
  computed: {
    canProceed() {
      if (this.currentStep === 1) {
        return this.inputsFilled.fullName && this.inputsFilled.group && this.inputsFilled.gender && this.inputsFilled.age && this.inputsFilled.mail
      }
      if (this.currentStep === 2) {
        return this.inputsFilled.question1
      }
      if (this.currentStep === 3) {
        return this.inputsFilled.question2
      }
      return this.inputsFilled.question3
    },
    canSubmit() {
      return this.inputsFilled.fullName && this.inputsFilled.group && this.inputsFilled.gender && this.inputsFilled.age && this.inputsFilled.mail && this.inputsFilled.phone && this.inputsFilled.question1 && this.inputsFilled.question2 && this.inputsFilled.question3
    },
  },
  methods: {
    handleInputFilled(field, isFilled) {
      this.inputsFilled[field] = isFilled
    },
    setBirthday(date) {
      this.formData.birthdate = date; // Обновляем значение в formData
      this.showCalendar = false; // Закрываем календарь
    },
    handleEnterKey(event) {
      // Проверка нажатия Enter и отсутствие фокуса
      if (event.key === 'Enter' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        if (this.currentStep < 4 && this.canProceed) {
          this.nextStep();
        } else if (this.currentStep === 4 && this.canSubmit) {
          this.submitTest();
        }
      }
    },

    updateAnswer(step, value) {
      this.testResult[step] = value
    },
    nextStep() {
      if (!this.canProceed) {
        this.$root.errorMessage = "Cannot proceed: validation failed.";
        this.$root.$refs.errorNotification.show();
        return;
      }
      if (this.currentStep === 1) {
        this.$refs.fullName.validate();
        this.$refs.phone.validate();

        if (!this.inputsFilled.fullName) {
          this.$root.errorMessage = "Фамилия Имя Отчество должны содержать три слова, разделенные пробелом.";
          this.$root.$refs.errorNotification.show();
          if (this.$refs.fullName) {
            this.$refs.fullName.focus();
          }
          return;
        }
        if (!this.inputsFilled.phone) {
          this.$root.errorMessage = "Телефон должен начинаться с +7 или +3 и содержать от 9 до 11 цифр.";
          this.$root.$refs.errorNotification.show();
          if (this.$refs.phone) {
            this.$refs.phone.focus();
          }
          return;
        }
      }
      this.currentStep++;
    },

    prevStep() {
      this.currentStep--
    },
      // Остальные методы остаются прежними
    async submitTest() {
      this.testSubmitted = true;
      this.submissionFailed = false; // Reset error flag on each submit attempt

      const testData = {
        fullName: this.testResult[0] || '',
        group: this.testResult[1] || '',
        gender: this.testResult[2] || '',
        age: parseInt(this.testResult[3]) || '',
        mail: this.testResult[4] || '',
        question1: this.testResult[5] || '',
        question2: this.testResult[6] || '',
        question3: this.testResult[7] || '',
        phone: this.testResult[8] || '',
        birthdate: this.testResult[9] || ''
      };

      try {
        const response = await sendTestData(testData);
        console.log('Ответ сервера:', response);
        this.showSubmittedMessage = true;
      } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        this.submissionFailed = true; // Set error flag to true on failure
        this.showSubmittedMessage = true; // Display message indicating failure
      }
    }
  }
}
</script>

<style scoped>
label{
  margin-bottom: 50px;
}
.test-view__submitted-message {
  margin: 150px;
}
.test-view__step-container {
  padding: 50px;
  background-color: #1b1f26;
  border-radius: 15px;
  width: 100vh;
}
.test-view__title {
  font-size: 48px;
}
.test-view__navigation {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 50px;
  width: 100%;
}
.test-view__button {
  padding: 15px 35px;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 0 20px;
  margin-bottom: 50px;
  color: inherit;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.test-view__button--back {
  background-color: #777777;
}
.test-view__button--back:hover {
  background-color: #4a4a4a;
  transform: scale(1.05);
}

.test-view__button--active {
  background-color: #00bfff;
  cursor: pointer;
}
.test-view__button--active:hover {
  background-color: #1e90ff;
  transform: scale(1.05);
}

.test-view__button--disabled {
  background-color: #939393;
  cursor: not-allowed;
}
.test-view__button--disabled:hover {
  background-color: #575656;
  transform: scale(1.05);
  cursor: not-allowed;
}
.fade-out-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-out-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-in-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-in-enter {
  opacity: 0;
  transform: translateY(20px);
}
.fade-in-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
