export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Пароль некорректен";
        case "USER_DISABLED":
            return "Учетная запись пользователя отключена администратором";
        case "EMAIL_NOT_FOUND":
            return "Нет пользователя, соответствующего этому идентификатору. Возможно, пользователь был удален.";
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует.";

        default:
            return "Слишком много попыток входа. Попробуй через некоторое время.";
    }
}
