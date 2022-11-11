// utils/validator.js
// import * as { isRequired, isEmail, isUrl, min } from "./validateRules";
import { isRequired, isUrl, isYearLess, isYearGreat1900, isFirstCapitalSymbol } from "./validateRules";

export const validate = (values, config) => {
    const errors = {};

    for (const name in values) {
        const validationRules = config[name];
        for (const rule in validationRules) {
            const { message, param } = validationRules[rule];

            // Вызываем валидатор
            const hasError = !validator(rule, values[name], param);

            if (hasError) {
                errors[name] = message;
                break;
            }
        }
    }

    return errors;
};

const validator = (ruleName, value, param) => {
    switch (ruleName) {
        case "isRequired":
            return isRequired(value);
        case "isYearLess":
            return isYearLess(value);
        case "isYearGreat1900":
            return isYearGreat1900(value);
        case "isUrl":
            return isUrl(value);
        case "isFirstCapitalSymbol":
            return isFirstCapitalSymbol(value);
        default:
            return true;
    }
};
