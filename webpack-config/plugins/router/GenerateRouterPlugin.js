const generateRouter = require('./generateRouter');

class GenerateRouterPlugin {
  apply(compiler) {
    compiler.hooks.afterEnvironment.tap('GenerateRouterPlugin', function () {
      console.log('GenerateRouterPlugin init');

      generateRouter();
    });
  }
}

module.exports = GenerateRouterPlugin;