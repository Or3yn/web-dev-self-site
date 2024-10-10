<template>
  <div class="test-view">
    <h1 class="test-view__title">Основы программирования и алгоритмические языки</h1>

    <transition name="fade-out" @after-leave="showSubmittedMessage = true">
      <div v-if="!testSubmitted" class="test-view__form-container">
        <!-- Шаг 1 -->
        <div class="test-view__step-container" v-show="currentStep === 1">
          <Input v-model="formData.fullName" label="Фамилия Имя Отчество" @inputFilled="handleInputFilled('fullName', $event)" @updateAnswer="updateAnswer(0, $event)" />
          <Selector v-model="formData.group" label="Группа" :options="groups" @inputFilled="handleInputFilled('group', $event)" @updateAnswer="updateAnswer(1, $event)" />
          <RadioGroup v-model="formData.gender" label="Пол" :options="genders" @inputFilled="handleInputFilled('gender', $event)" @updateAnswer="updateAnswer(2, $event)" />
          <Selector v-model="formData.age" label="Возраст" :options="ages" @inputFilled="handleInputFilled('age', $event)" @updateAnswer="updateAnswer(3, $event)" />
          <Input v-model="formData.mail" label="E-mail" type="email" @inputFilled="handleInputFilled('mail', $event)" @updateAnswer="updateAnswer(4, $event)" />
        </div>

        <!-- Шаг 2 -->
        <div class="test-view__step-container" v-show="currentStep === 2">
          <Selector v-model="formData.question1" label="Что такое алгоритм?" :options="questions1" @inputFilled="handleInputFilled('question1', $event)" @updateAnswer="updateAnswer(5, $event)" />
        </div>

        <!-- Шаг 3 -->
        <div class="test-view__step-container" v-show="currentStep === 3">
          <Input v-model="formData.question2" label="Опишите принципы ООП" textarea @inputFilled="handleInputFilled('question2', $event)" @updateAnswer="updateAnswer(6, $event)" />
        </div>

        <!-- Шаг 4 -->
        <div class="test-view__step-container" v-show="currentStep === 4">
          <RadioGroup v-model="formData.question3" label="Какой оператор используется для цикла?" :options="questions3" @inputFilled="handleInputFilled('question3', $event)" @updateAnswer="updateAnswer(7, $event)" />
        </div>

        <!-- Навигационные кнопки -->
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
        Ответы отправлены.
      </div>
    </transition>
  </div>
</template>


<script>
import Input from '../components/ui/Input.vue';
import Selector from '../components/ui/Selector.vue';
import RadioGroup from '../components/ui/RadioGroup.vue';
import { sendTestData } from '../services/emailService';  // Используем API для отправки email

export default {
  components: {
    Input,
    Selector,
    RadioGroup,
  },
  data() {
    return {
      currentStep: 1,
      testSubmitted: false,
      showSubmittedMessage: false,
      formData: {
        fullName: '',   // Фамилия Имя Отчество
        group: '',      // Группа
        gender: '',     // Пол
        age: '',        // Возраст
        mail: '',       // E-mail
        question1: '',  // Ответ на вопрос 1
        question2: '',  // Ответ на вопрос 2
        question3: '',  // Ответ на вопрос 3
      },
      testResult: [],  // Массив для хранения ответов
      inputsFilled: {
        fullName: false,
        group: false,
        gender: false,
        age: false,
        mail: false,
        question1: false,
        question2: false,
        question3: false,
      },
      groups: ['101', '102', '103'],  // Пример групп
      genders: ['Мужской', 'Женский'],  // Пол
      ages: Array.from({ length: 60 }, (_, i) => i + 18),  // Возраст от 18 до 77
      questions1: ['Шаги, выполняемые последовательно', 'Условное выражение', 'Функция'],  // Варианты ответа на первый вопрос
      questions3: ['for', 'if', 'switch', 'while'],  // Варианты ответа на третий вопрос
    };
  },
  computed: {
    canProceed() {
      if (this.currentStep === 1) {
        return this.inputsFilled.fullName && this.inputsFilled.group && this.inputsFilled.gender && this.inputsFilled.age && this.inputsFilled.mail;
      }
      if (this.currentStep === 2) {
        return this.inputsFilled.question1;
      }
      if (this.currentStep === 3) {
        return this.inputsFilled.question2;
      }
      return this.inputsFilled.question3;
    },
    canSubmit() {
      return this.inputsFilled.fullName && this.inputsFilled.group && this.inputsFilled.gender && this.inputsFilled.age && this.inputsFilled.mail && this.inputsFilled.question1 && this.inputsFilled.question2 && this.inputsFilled.question3;
    },
  },
  methods: {
    handleInputFilled(field, isFilled) {
      this.inputsFilled[field] = isFilled;
    },
    updateAnswer(step, value) {
      this.testResult[step] = value;  // Обновляем конкретное значение в массиве testResult
    },
    nextStep() {
      if (this.canProceed) {
        this.currentStep++;
      }
    },
    prevStep() {
      this.currentStep--;
    },
    async submitTest() {
      this.testSubmitted = true;
      const testData = {
        fullName: this.testResult[0],
        group: this.testResult[1],
        gender: this.testResult[2],
        age: parseInt(this.testResult[3]),
        mail: this.testResult[4],
        question1: this.testResult[5],
        question2: this.testResult[6],
        question3: this.testResult[7],
      };
      try {
        await sendTestData(testData);  // Используем сервис для отправки email
        console.log('Данные отправлены успешно');
      } catch (error) {
        console.error('Ошибка при отправке данных:', error);
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

/* Центрирование кнопок и расстояние между ними */
.test-view__navigation {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 50px;
  width: 100%; /* Ширина контейнера */
}

/* Стили кнопок */
.test-view__button {
  padding: 15px 35px; /* Увеличенный padding */
  font-size: 15px; /* Увеличенный размер текста */
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 0 20px;
  margin-bottom: 50px; /* Обновленный отступ снизу */
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

/* Активная кнопка */
.test-view__button--active {
  background-color: #00bfff;
  cursor: pointer;
}

.test-view__button--active:hover {
  background-color: #1e90ff;
  transform: scale(1.05);
}

/* Неактивная кнопка */
.test-view__button--disabled {
  background-color: #939393;
  cursor: not-allowed;
}

.test-view__button--disabled:hover {
  background-color: #575656;
  transform: scale(1.05);
  cursor: not-allowed;
}

/* Стили анимации исчезновения */
.fade-out-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-out-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Стили анимации появления */
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
