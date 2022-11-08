module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        // "eslint:recommended",
        "plugin:react/recommended",
        // "standard"
        "prettier"
    ],
    // parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
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
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        // "multiline-ternary": ["warn", "always-multiline"]
        "space-before-function-paren": [
            "error",
            {
                anonymous: "always",
                named: "never"
            }
        ],
        "multiline-ternary": ["off"],
        "react/display-name": "off"
    }
};
