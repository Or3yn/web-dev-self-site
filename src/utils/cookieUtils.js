// src/utils/cookieUtils.js

export function setCookie(name, value, expirationDays) {
    const date = new Date();
    date.setDate(date.getDate() + expirationDays);
    // Преобразуем значение в JSON-строку перед сохранением
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; path=/; expires=${date.toUTCString()}`;
}

export function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        `(?:^|; )${name}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
