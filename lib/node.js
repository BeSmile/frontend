'use strict';
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
exports.__esModule = true;
var path = require('path');
var fs = require('fs');
var root = path.dirname(__dirname);
var yarnrcPath = path.join(root, 'remote', '.yarnrc');
var yarnrc = fs.readFileSync(yarnrcPath, 'utf8');
var version = /^target\s+"([^"]+)"$/m.exec(yarnrc)[1];
var platform = process.platform;
var arch = process.arch;
var node = platform === 'win32' ? 'node.exe' : 'node';
var nodePath = path.join(root, '.build', 'node', 'v' + version, platform + '-' + arch, node);
console.log(nodePath);
