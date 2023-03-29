interface CodeFileInterface {
  // ctrl+z 代码回退
  rollback(): void;
}

export enum FILE_STAT {
  DELETED = 'deleted',
  MODIFIED = 'modified',
  NEW_FILE = 'new file',
}

enum FILE_TYPE {
  JSON = 'json',
  TS = 'typescript',
}

export class CodeFile implements CodeFileInterface {
  // 代码
  private code: string;
  status: FILE_STAT;
  fileType: FILE_TYPE;
  // 文件唯一id
  private readonly _UUID: string;
  constructor() {
    this.code = '';
    this.status = FILE_STAT.NEW_FILE;
    this.fileType = FILE_TYPE.JSON;
    this._UUID = '333';
  }
  rollback() {
    console.log(this, 'ddd');
  }
}
