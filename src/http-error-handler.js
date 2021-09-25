const http_status_codes = {
    "1000": "Success",
    "1001": "Срок действия токена истек, нам нужно обновить токен",
    "1002": "Срок действия токена обновления истек, нам нужно войти снова",
    "1003": "Ошибка сети",
    "1004": "Неаутентифицированный пользователь",
    "1005": "вы вошли с другого устройства",
    "1006": "Не найден",
    "2001": "Номер телефона или пароль неверны",
    "2002": "Номер телефона уже занят",
    "2003": "Имя пользователя уже существует",
    "2004": "Код подтверждения по SMS был неверным",
    "2005": "Срок действия проверочного кода по SMS истек",
    "2006": "Слишком много попыток",
    "8001": "server error database issue",
    "8002": "server error bad request",
    "8003": "permission error",
    "8004": "filesystem server error",
    "8005": "Internal server error: Database issue",
    "8006": "Bad request",
    "8007": "Permission denied error",
    "8008": "Internal server error: File System issue",
    "8009": "Internal server error: attach token",
    "8010": "Refresh token is wrong: case when logged in with another device",
    "8011": "Универсальный, не найден",
    "8012": "Internal server error: bad request in controller",

}

export function HttpStatusException(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message ?? http_status_codes[statusCode];
    this.toString = function () {
        return `${this.statusCode}: ${this.message}`;
    }
}

export function checkStatusCode(statusCode) {
    return statusCode === 1000;
}
