/**
 * 读取remote/.yarnrc文件,获取指定的node版本
 */
let err = false;

const nodeVersion = /^(\d+).(\d+).(\d+)/.exec(process.versions.node);
const majorNodeVersion = parseInt(nodeVersion[1]);
const minorNodeVersion = parseInt(nodeVersion[2]);
// const patchNodeVersion = parseInt(nodeVersion[3]);

if(majorNodeVersion < 14 || (majorNodeVersion === 14 && minorNodeVersion < 16)) {
  console.error('node版本号不能低于14.16.x');
  err = true;
}

const path = require('path');
const fs = require('fs');
const cp = require('child_process');

if(!/(pnpm|yarn)/.exec(process.env.npm_execpath || '')) {
  console.error('请使用pnpm或者yarn安装');
  err = true;
}

if(err) {
  process.exit(1);
}

if (process.platform === 'win32') {

  if (!err) {
    installHeaders();
  }
}

function installHeaders() {
  const yarn = 'pnpm';
  // 通过命令指定执行目录进行node-gyp的安装. (node-gyp是为了重新编译c++代码,跨平台)
  const yarnResult = cp.spawnSync(yarn, ['install'], {
    env: process.env,
    cwd: path.join(__dirname, 'gyp'),
    stdio: 'inherit'
  });
  if(yarnResult.error || yarnResult.status !== 0) {
    err = true;
    return;
  }

  const nodeGyp = path.join(__dirname, 'gyp', 'node_modules', '.bin', 'node-gyp');
  const result = cp.execFileSync(nodeGyp, ['list'], { encoding: 'utf8' });
  const versions = new Set(result.split(/\n/g).filter(line => !line.startsWith('gyp info')).map(value => value));

  const remote = getHeaderInfo(path.join(__dirname, '..', 'remote', '.yarnrc'));

  // 进行node的版本安装,确认安装是需要的版本
  if(remote !== undefined && !versions.has(remote.target)) {
    cp.execFileSync(nodeGyp, ['install', '--dist-url', remote.distUrl, remote.target]);
  }
}

/**
 * @param {string} rcFile
 * @returns {{ distUrl: string; target: string } | undefined}
 */
function getHeaderInfo(rcFile) {
  // Unix系统里，每行结尾只有“<换行>”，即“\n”；
  // Windows系统里面，每行结尾是“<回车><换行>”，即“\r\n”；
  // Mac系统里，每行结尾是“<回车>”,即“\r”。
  const lines = fs.readFileSync(rcFile, 'utf8').split(/\n/g);
  let distUrl, target;
  for (const line of lines) {
    let match = line.match(/\s*dist_url\s*"(.*)"\s*$/);
    if (match !== null && match.length >= 1) {
      distUrl = match[1];
    }
    match = line.match(/^target\s*"(.*)"\s*$/);
    if (match !== null && match.length >= 1) {
      target = match[1];
    }
  }
  return distUrl !== undefined && target !== undefined
    ? { distUrl, target }
    : undefined;
}