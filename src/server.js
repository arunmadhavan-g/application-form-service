require('@babel/register')({
   presets: ['env']
});
require('@babel/polyfill');

module.exports = require("./index.js");