import { IS_DEBUG } from '@/constants/path';

export const startWatch = () => {
  const targetNode = document.getElementById('root')!;

  // 观察器的配置（需要观察什么变动）
  const config = { attributes: true, childList: true, subtree: true };

  const callback = function (mutationsList: MutationRecord[], observer: MutationObserver) {
    console.log(mutationsList, observer);
  };

  const observer = new MutationObserver(callback);

  observer.observe(targetNode, config);

  console.log(performance.now(), performance.navigation, performance.timing, 'performance');
  observer.disconnect();
};

const fps_compatibility = (function () {
  return (
    window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
const fps_config = {
  lastTime: performance.now(),
  lastFameTime: performance.now(),
  frame: 0,
};
// 利用 requestAnimationFrame 在一秒内执行 60 次（在不卡顿的情况下）这一点，假设页面加载用时 X ms，这期间 requestAnimationFrame 执行了 N 次，则帧率为1000* N/X，也就是FPS。
export const fps_loop = function () {
  const _first = performance.now(),
    _diff = _first - fps_config.lastFameTime;
  fps_config.lastFameTime = _first;
  // 当前函数执行ms, 1000/ms 即帧率
  let fps = Math.round(1000 / _diff);
  fps_config.frame++;
  if (_first > 1000 + fps_config.lastTime) {
    fps = Math.round((fps_config.frame * 1000) / (_first - fps_config.lastTime));
    console.log(`time: ${new Date()} fps is：`, fps);
    fps_config.frame = 0;
    fps_config.lastTime = _first;
  }
  fps_compatibility(fps_loop);
};

export const initWatch = () => {
  if (IS_DEBUG) {
    startWatch();
    fps_loop();
  }
};
