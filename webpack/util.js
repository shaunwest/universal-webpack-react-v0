/*
 * util.js
 */

const args = process.argv;

const arg = argValue => args.find(arg => arg === argValue);

const isProd = () => process.env.NODE_ENV === 'production';

module.exports = {
  args,
  arg,
  isProd
};
