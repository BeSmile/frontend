const generateRouter = require('./generateRouter');

class GenerateRouterPlugin {
  apply(compiler) {
    compiler.hooks.afterEnvironment.tap('GenerateRouterPlugin', function () {
      generateRouter();
    });
  }
}

module.exports = GenerateRouterPlugin;