import { JSON_PATH, REACT_TS_PATH } from '@/pages/sandbox/constant';
import { EXTERNAL_SCRIPTS } from '@/pages/sandbox/components/CodeIframe/constants';
import { RequireType, Module, Message } from '@/pages/sandbox/components/CodeIframe/types';

const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  Babel: 'Babel',
};

class ModuleNode {
  private _type: string;
  private _path: string;
  private _initiators: Set<any>;
  private _isChanged: boolean;
  private _module: any;
  private _code: string;
  private _transpiledCode: string;
  constructor(path: string) {
    this._path = path;
    this._type = path.endsWith('css') ? 'css' : 'tsx';
    this._initiators = new Set();
    this._isChanged = true;
    this._module = null;
    this._transpiledCode = '';
    this._code = '';
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get path(): string {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }

  get initiators(): Set<any> {
    return this._initiators;
  }

  set initiators(value: Set<any>) {
    this._initiators = value;
  }

  get isChanged(): boolean {
    return this._isChanged;
  }

  set isChanged(value: boolean) {
    this._isChanged = value;
  }

  get module(): any {
    return this._module;
  }

  set module(value: any) {
    this._module = value;
  }

  get transpiledCode(): string {
    return this._transpiledCode;
  }

  set transpiledCode(value: string) {
    this._transpiledCode = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }
}

// map根据路径进行缓存编译代码
class ModuleGraph {
  moduleMap = new Map();

  getModule(id: string) {
    return this.moduleMap.get(id);
  }
}

export default (window: Window, document: Document) => {
  // 存放全局module
  const globalModuleGraph = new ModuleGraph();

  function getNewModule() {
    const exports = {};
    return {
      exports,
    };
  }

  /**
   * 执行代码
   * @param codeModule
   * @param moduleGraph
   */
  function evaluateCodeModule(codeModule: ModuleNode, moduleGraph: ModuleGraph) {
    console.group('evaluateCodeModule');
    codeModule.module = codeModule.module || getNewModule();
    // import被编译成es5之后
    const require = (moduleName: string) => {
      console.log(`require: ${moduleName}`);
      if (/^[./]/.test(moduleName)) {
        // 获取路径
        const requiredModule = moduleGraph.getModule(moduleName);
        if (requiredModule.module) {
          return requiredModule.module.exports;
        }
        requiredModule.module = getNewModule();
        // 获取代码code
        return evaluateCodeModule(requiredModule, moduleGraph);
      }

      // 引入公共依赖
      const extLib = window[moduleName] || window[externals[moduleName]];
      if (extLib) {
        return extLib;
      }
    };
    console.groupEnd();
    return evaluateCode(codeModule.transpiledCode, require, codeModule.module);
  }

  const babelTransform = (code: string): string => {
    return window['Babel'].transform(code, {
      plugins: [
        ['transform-modules-commonjs'],
        ['transform-react-jsx'],
        // [ReactFreshBabelPlugin]
      ],
    }).code;
  };

  /**
   * 转译代码
   * @param codeModule
   */
  const compileCode = function (codeModule: ModuleNode) {
    // 处理jsx,tsx部分
    if (new RegExp(REACT_TS_PATH, 'g').test(codeModule.path)) {
      // tsx | jsx代码进行react转译
      return babelTransform(codeModule.code);
    }
    if (new RegExp(JSON_PATH, 'g').test(codeModule.path)) {
      return `module.exports = ${codeModule.code}`;
    }
    return '';
  };

  const compilationCode = (moduleGraph: ModuleGraph) => {
    // 获取文件路径生成mapKey并缓存
    const moduleMap = moduleGraph.moduleMap;

    moduleMap.forEach((codeModule) => {
      codeModule.transpiledCode = compileCode(codeModule);
    });
  };

  /**
   * entry    入口目录
   *
   */
  const startEvaluate = (message: Message, moduleGraph: ModuleGraph) => {
    // 只处理首部
    const { entry } = message;
    const entryModule = moduleGraph.getModule(entry);
    evaluateCodeModule(entryModule, moduleGraph);
    // todo热更新
  };

  // transpiledCode 转译后的源代码
  // require 自定义的获取模块函数，看下文
  // module 是与当前源代码绑定的执行结果（一开始为空对象，eval执行后赋值）
  /*
  
  ## es2020
  import { valueOfPi } from "./constants.js";
  export const twoPi = valueOfPi * 2;
  
  ## CommonJS
  "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.twoPi = void 0;
    const constants_js_1 = require("./constants.js");
    exports.twoPi = constants_js_1.valueOfPi * 2;
  ## UMD
  (function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./constants.js"], factory);
    }
  })(function (require, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.twoPi = void 0;
      const constants_js_1 = require("./constants.js");
      exports.twoPi = constants_js_1.valueOfPi * 2;
  })
  */
  function evaluateCode(transpiledCode: string, require: RequireType, module: Module) {
    // #1. 构建 require, module, exports 当前函数的上下文全局数据
    const allGlobals = {
      require,
      module,
      exports: module.exports,
    };
    const allGlobalKeys = Object.keys(allGlobals).join(', ');
    const allGlobalValues = Object.values(allGlobals);
    try {
      // #2. 源代码外面加一层函数，构建函数的入参为 require, module, exports
      const newCode = `(function evaluate(` + allGlobalKeys + `) {` + transpiledCode + `\n})`;
      // #3. 利用 eval 执行此函数，并传入 require, module, exports
      eval(newCode).apply(window, allGlobalValues);
      return module.exports;
    } catch (e) {
      console.log(e, 'e');
    }
  }

  const handleErrorEvents = () => {
    console.log('document error');
  };

  const initExternals = (document: Document): Promise<boolean>[] => {
    return EXTERNAL_SCRIPTS.map((scriptPath) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          reject(false);
        };
        script.src = scriptPath;
        document.body.append(script);
      });
    });
  };

  const traversalModuleMap = (message: Message, moduleGraph: ModuleGraph) => {
    message?.source?.forEach((codeFile) => {
      const newModule = new ModuleNode(codeFile.path);
      newModule.code = codeFile.code;
      newModule.isChanged = true;
      newModule.transpiledCode = codeFile.compiledCode || '';
      moduleGraph.moduleMap.set(codeFile.path, newModule);
    });
  };

  const messageEvent = (event: MessageEvent<Message>) => {
    if (!event) {
      return;
    }
    const message = event.data;
    // 初始化文件结构
    traversalModuleMap(message, globalModuleGraph);
    // 编译
    compilationCode(globalModuleGraph);
    // 执行
    startEvaluate(message, globalModuleGraph);
    event.source?.postMessage('iframe onLoaded');
  };

  document.body.innerHTML = '<div id="root">root</div>';

  // iframe
  window.addEventListener('error', handleErrorEvents);

  // window['require'] = requireJs;

  Promise.all(initExternals(document)).then((jsLoaded) => {
    const allSuccess = jsLoaded.every(Boolean);
    if (allSuccess) {
      window.addEventListener('message', messageEvent);
    }
  });

  return () => {
    window.removeEventListener('error', handleErrorEvents);
    window.removeEventListener('message', messageEvent);
  };
};
