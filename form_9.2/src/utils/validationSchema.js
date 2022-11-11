export const validationSchema = {
    name: {
        isRequired: {
            message: "Имя обязательна для заполнения",
        },
        isFirstCapitalSymbol: {
            message: "Имя должно начинаться с большой буквы",
        },
    },
    surname: {
        isRequired: {
            message: "Фамилия обязательна для заполнения",
        },
    },
    year: {
        isYearLess: {
            message: "Год рождения не может быть больше, чем текущий год",
        },
        isYearGreat1900: {
            message: "Год рождения должен быть больше, чем 1900 год",
        },
    },
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения",
        },
        isEmail: {
            message: "Email введён некорректно",
        },
    },
    link: {
        isRequired: {
            message: "Ссылка обязательна для заполнения",
        },
        isUrl: {
            message: "Адрес не корректный",
        },
    },
    description: {
        isRequired: {
            message: "Описание обязательно для заполнения",
        },
        min: {
            message: "Описание должно содердать минимум 20 символов",
            param: 20,
        },
    },
};
