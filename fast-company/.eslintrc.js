module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/jsx-runtime",
        // "plugin:prettier/recommended"
        "prettier"
    ],
    // extends: ["plugin:react/recommended", "standard"],
    overrides: [],
    // extends: ["airbnb-base", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: [
        "react"
        // "prettier"
    ],
    rules: {
        indent: [
            "warn",
            4,
            {
                SwitchCase: 1,
                ignoredNodes: ["PropertyDefinition", "ConditionalExpression"],
                flatTernaryExpressions: false,
                offsetTernaryExpressions: true
            }
        ],
        "multiline-ternary": ["off"],
        semi: [2, "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "multiline-ternary": ["warn", "always-multiline"]
        // "prettier/prettier": "error",
        // "arrow-body-style": "off",
        // "prefer-arrow-callback": "off"
    }
};
