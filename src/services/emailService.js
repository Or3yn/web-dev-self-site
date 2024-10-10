import axios from 'axios';

export const sendTestData = async (testData) => {
    console.log(testData)
    try {
        const endpoint = 'http://127.0.0.1:8000/submit_test';  // Адрес сервера FastAPI
        const response = await axios.post(endpoint, testData);  // Отправляем данные через axios
        return response;  // Возвращаем ответ сервера
    } catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
        throw error;
    }
};
