const warn = () => console.warn('ActivityAndroid is not supported on iOS');

module.exports = () => ({
  moveTaskToBack: warn,
  addEventListener: warn,
  removeEventListener: warn
});