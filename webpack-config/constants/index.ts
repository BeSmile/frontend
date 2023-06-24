import path from 'path';
import process from 'process';

const PROJECT = process.cwd();

export const THEME_PATH = path.join(PROJECT, 'src/styles/atom/icons.less');

export const THEME_LIST = ['fa', 'devicons', 'fi'];

export const RUNTIME_DIRECTORY = path.join(PROJECT, 'src/.runtime');