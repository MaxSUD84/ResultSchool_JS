import validateRules from "./validateRules";

export const validate = (values, config) => {
  const errors = {};

  for (const name in values) {
    const validationRules = config[name];
    for (const rule in validationRules) {
      const { message, param } = validationRules[rule];

      // Получение нужного валидатора
      const validator = validateRules[rule];
      // Вызываем валидатор, если он есть
      const hasError = validator && !validator(values[name], param);

      if (hasError) {
        errors[name] = message;
        break;
      }
    }
  }

  return errors;
};
