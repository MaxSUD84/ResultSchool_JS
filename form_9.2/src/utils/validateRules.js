// validateRules.js

/* eslint-disable import/no-anonymous-default-export */
// Экспортируем объект, а не отдельные функции (не сработало ...)

export const isRequired = (value) => Boolean(value.trim());
export const isEmail = (value) => /^S+@S+.S+$/g.test(value);
export const isUrl = (value) => {
    const urlRegExp = new RegExp(
        `(^(?:http|https|ftp|ftps)(?::\/\/)){1}(?:([A-z0-9-]+)((?::([A-z0-9-]+))*)(?:@?(?:[A-z0-9-]+)){1})+(?:\.[a-z]{2,3})$`,
        "g"
    );
    return urlRegExp.test(value);
    // console.log("data: ", value, " ", res);
    // res;
};
export const min = (value, length) => value.length >= length;
export const isCapitalSymbol = (value) => /[A-Z]+/g.test(value);
export const isContainDigit = (value) => /d+/g.test(value);
export const isYearLess = (value) => value <= new Date().getFullYear();
export const isYearGreat1900 = (value) => value > 1900;
export const isFirstCapitalSymbol = (value) => /^([А-Я]|[A-Z]){1}/g.test(value);

// export default { isRequired, isEmail, isUrl, min, isCapitalSymbol, isContainDigit };
