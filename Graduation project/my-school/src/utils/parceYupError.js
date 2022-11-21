export const parceYupError = (yupError) => {
  const { inner } = yupError;

  return Array.isArray(inner)
    ? inner.reduce((acc, item) => {
        const { path, errors } = item;
        // Проверяем есть ли ошибка уже в объете
        // eslint-disable-next-line no-prototype-builtins
        if (!acc.hasOwnProperty(path) && errors.length) {
          // Если нет то добавляем первую
          acc[path] = errors[0];
        }

        return acc;
      }, {})
    : {};
};
