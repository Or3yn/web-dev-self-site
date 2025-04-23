import axios from 'axios';

export const sendTestData = async (testData) => {
    try {
        const endpoint = 'http://127.0.0.1:8000/send_email'; // Адрес сервера Node.js
        const response = await axios.post(endpoint, testData); // Отправляем данные
        return response.data; // Возвращаем ответ сервера
    } catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
        throw error;
    }
};
