const env = "dev";

function buildConfig(env) {
  return require("./config/" + env + ".js")({ env: env });
}

module.exports = buildConfig(env);
