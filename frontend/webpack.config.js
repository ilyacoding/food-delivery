//Enabling this option cause access node-specific variable
/*eslint-env node*/

module.exports = function () {
    return require(`./webpack.${process.env.NODE_ENV}.js`);
};