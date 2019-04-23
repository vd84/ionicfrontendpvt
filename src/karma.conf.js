
module.exports = function(config) {
  config.set({

    autoWatch: false,

    browsers: ['ChromeHeadless'],
    // you can define custom flags
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    singleRun: true

  })
};
