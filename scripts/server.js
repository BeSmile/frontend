const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const minimist = require('minimist');
const fancyLog = require('fancy-log');
const ansiColors = require('ansi-colors');

const opn = require('opn');

// 项目根目录
const APP_ROOT = path.join(__dirname, '..');

async function main() {
  const args = minimist(process.argv.slice(2), {
    string: [
      'port',
      'browser',
      'browserType'
    ]
  })

  const serverArgs = [];

  const HOST = args['host'] ?? 'localhost';
  const PORT = args['port'] ?? '9000';
  const ENV = args['env'] ?? 'dev';

  if(args['host'] === undefined) {
    serverArgs.push('--host', HOST);
  }
  if(args['port'] === undefined) {
    serverArgs.push('--port', PORT);
  }
  if(args['dev'] === undefined) {
    serverArgs.push('--env', ENV);
  }

  let openSystemBrowser = false;

  // 不存在则默认打开
  if(!args['browser'] && !args['browserType']) {
    serverArgs.push('--browserType', 'none');
    openSystemBrowser = true
  }

  startServer(serverArgs);
  if(openSystemBrowser) {
    // opn(`http://${HOST}:${PORT}/`, {
    //   name: 'frontend',
    // });
  }
}

const webLocation = require.resolve('../webpack-config/dev-server');

function startServer(runnerArguments) {
  const { env, } = { ...process.env }
  // cross-env webpack-dev-server --config ./webpack-config/webpack.server.js --env.development
  // const proc = cp.spawn(process.execPath, [webLocation, ...runnerArguments], { env, stdio: 'inherit' })
  const proc = cp.spawn(process.execPath, [webLocation, ...runnerArguments], { env, stdio: 'inherit' });

  fancyLog(process.execPath, webLocation, ...runnerArguments)

  proc.on('exit', (code) => {
    console.log(code, 'code');
    process.exit(code)
  });

  process.on('exit', () => proc.kill());
  process.on('SIGINT', () => {
    proc.kill();
    process.exit(128 + 2); // https://nodejs.org/docs/v14.16.0/api/process.html#process_signal_events
  });
  process.on('SIGTERM', () => {
    proc.kill();
    process.exit(128 + 15); // https://nodejs.org/docs/v14.16.0/api/process.html#process_signal_events
  });
}

main();