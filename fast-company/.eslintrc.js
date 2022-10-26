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
    plugins: ["react"],
    rules: {
        indent: [
            "error",
            4,
            { SwitchCase: 1, ignoredNodes: ["PropertyDefinition"] }
        ],
        semi: [2, "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "multiline-ternary": ["error", "always-multiline"]
    }
};
