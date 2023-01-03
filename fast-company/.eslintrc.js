module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/jsx-runtime",
        "prettier"
    ],
    overrides: [],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 11,
        sourceType: "module"
    },
    plugins: ["react", "prettier"],
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
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
                avoidEscape: true
            }
        ],
        "multiline-ternary": ["warn", "always-multiline"]
        // "prettier/prettier": "error",
        // "arrow-body-style": "off",
        // "prefer-arrow-callback": "off"
    }
};
