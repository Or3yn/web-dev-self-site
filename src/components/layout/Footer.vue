<template>
  <div class="footer">
    <p>© 2024 София Богданова. Все права защищены.</p>
    <div class="footer-icons">
      <a href="https://gl.pkzdrav.ru/bsd" target="_blank" rel="noopener noreferrer">
        <img :src="gitlabImage" alt="Gitlab" class="footer-icons__item">
      </a>
      <a href="https://github.com/Or3yn" target="_blank" rel="noopener noreferrer">
        <img :src="githubImage" alt="GitHub" class="footer-icons__item">
      </a>
      <a href="https://t.me/Eagwynn" target="_blank" rel="noopener noreferrer">
        <img :src="telegramImage" alt="Telegram" class="footer-icons__item">
      </a>
    </div>
  </div>
</template>

<script>
import gitlabImage from '../../assets/icons/gitlab.svg'
import githubImage from '../../assets/icons/github.svg'
import telegramImage from '../../assets/icons/telegram.svg'

export default {
  name: 'Footer',
  data() {
    return {
      gitlabImage,
      githubImage,
      telegramImage,
    }
  }
}
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-direction: column;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 50px 0 0 50px;
  margin-bottom: 20px;
}

.footer-icons {
  display: flex;
  gap: 50px;
  flex-direction: row;
  justify-content: center;
}

.footer-icons__item {
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.footer-icons__item:hover {
  transform: scale(1.2);
  opacity: 0.7;
}
</style>
