/** @returns {Promise<import('jest').Config>} */
module.exports = {
    preset: "jest-preset-preact",
    moduleNameMapper: {
        "^components/(.*)$": "<rootDir>/src/components/$1",
        "^utils/(.*)$": "<rootDir>/src/utils/$1",
        "^containers/(.*)$": "<rootDir>/src/containers/$1",
        "^plugins/(.*)$": "<rootDir>/plugins/$1",
        "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
            "<rootDir>/src/style/test_style_mock.js",
    },
    transform: {
        "^.+\\.[tj]sx?$": ["babel-jest"],
    },
    clearMocks: true,
    resetMocks: true,
    setupFiles: ["jest-localstorage-mock"],
};
