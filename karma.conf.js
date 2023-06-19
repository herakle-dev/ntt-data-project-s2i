
module.exports = function(config) {
  config.set({
    basePath: 'src',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      { pattern: './src/**/*.spec.ts', watched: true }
    ],
    preprocessors: {
      './src/**/*.spec.ts': ['@angular-devkit/build-angular']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
