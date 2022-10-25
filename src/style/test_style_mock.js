// Jest doesn't handle non JavaScript assets by default.
// You can use this module to avoid errors when importing non JavaScript assets.
// To avoid Jest encountered an unexpected token when parsing a .less file
// https://stackoverflow.com/questions/37072641/make-jest-ignore-the-less-import-when-testing
module.exports = {
    process() {
        return "";
    },
};
