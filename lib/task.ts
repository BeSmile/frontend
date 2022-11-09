import fancyLog from 'fancy-log';
import * as ansiColors from 'ansi-colors';

export interface BaseTask {
  displayName?: string;
  taskName?: string;
  _tasks?: Task[];
}

function _renderTime(time: number): string {
  return `${Math.round(time)} ms`;
}

export interface PromiseTask extends BaseTask {
  (): Promise<void>;
}

export interface StreamTask extends BaseTask {
  // eslint-disable-next-line no-undef
  (): NodeJS.ReadWriteStream;
}

export interface CallbackTask extends BaseTask {
  (cb?: (err?: any) => void): void;
}

export type Task = PromiseTask | StreamTask | CallbackTask;

// eslint-disable-next-line no-undef
function _isPromise(p: Promise<void> | NodeJS.ReadWriteStream): p is Promise<void> {
  return typeof (<any>p).then === 'function';
}

async function _doExecute(task: Task): Promise<void> {
  // Always invoke as if it were a callback task
  return new Promise((resolve, reject) => {
    if (task.length === 1) {
      // this is a callback task
      task((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
      return;
    }
    
    const taskResult = task();
    
    if (typeof taskResult === 'undefined') {
      // this is a sync task
      resolve();
      return;
    }
    
    if (_isPromise(taskResult)) {
      // this is a promise returning task
      taskResult.then(resolve, reject);
      return;
    }
    
    // this is a stream returning task
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    taskResult.on('end', (_) => resolve());
    taskResult.on('error', (err) => reject(err));
  });
}

async function _execute(task: Task): Promise<void> {
  const name = task.taskName || task.displayName || '<anonymous>';
  if (!task._tasks) {
    fancyLog('Starting', ansiColors.cyan(name), '...');
  }
  const startTime = process.hrtime();
  await _doExecute(task);
  const elapsedArr = process.hrtime(startTime);
  const elapsedNanoseconds = elapsedArr[0] * 1e9 + elapsedArr[1];
  if (!task._tasks) {
    fancyLog(
      'Finished',
      ansiColors.cyan(name),
      'after',
      ansiColors.magenta(_renderTime(elapsedNanoseconds / 1e6))
    );
  }
}

/**
 * 序列调用任务
 * @param tasks
 */
export function series(...tasks: Task[]): PromiseTask {
  const result = async () => {
    for (let i = 0; i < tasks.length; i++) {
      await _execute(tasks[i]);
    }
  };
  result._tasks = tasks;
  return result;
}

export function parallel(...tasks: Task[]): PromiseTask {
  const result = async () => {
    await Promise.all(tasks.map((t) => _execute(t)));
  };
  result._tasks = tasks;
  return result;
}

/**
 *  定义task任务
 * @param name
 * @param task
 */
export function define(name: string, task: Task): Task {
  if (task._tasks) {
    const lastTask = task._tasks[task._tasks.length - 1];
    if (lastTask._tasks || lastTask.taskName) {
      return define(
        name,
        series(task, () => Promise.resolve())
      );
    }
    lastTask.taskName = name;
    task.displayName = name;
    return task;
  }
  
  task.taskName = name;
  task.displayName = name;
  return task;
}
