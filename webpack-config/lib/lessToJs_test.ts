import lessToJs from './lessToJs';
import fs from 'fs';
import path from 'path';

lessToJs(fs.readFileSync(path.resolve('src/styles/theme-file.less'), 'utf8'));