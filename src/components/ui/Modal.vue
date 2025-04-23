<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <p class="modal-text">Вы уверены, что хотите отправить результаты?</p>
      <div class="modal-actions">
        <button @click="confirm" class="modal-button yes-button">Да</button>
        <button @click="cancel" class="modal-button no-button">Нет</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.modal-text {
  margin-bottom: 20px;
  font-size: 18px;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
}

.modal-button {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  color: #ffffff;
  transition: background-color 0.3s;
}

.yes-button {
  background-color: #93dc97; /* Green color */
}

.yes-button:hover {
  background-color: #388e3c;
}

.no-button {
  background-color: #d6746d; /* Red color */
}

.no-button:hover {
  background-color: #d32f2f;
}
</style>
