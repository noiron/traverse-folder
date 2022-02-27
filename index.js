const os = require('os');
const path = require('path');
const { traverseFolderList } = require('./traverseFolderList');
const { asyncTraverseFolderList } = require('./asyncTraverseFolderList');
const { traverseFolderObj } = require('./traverseFolderObj');

const folderPath = path.resolve(os.homedir(), 'code');

(function () {
  const list = [];
  const startTime = Date.now();
  traverseFolderList(folderPath, list);
  const endTime = Date.now();
  console.log(`共${list.length}个文件, 耗时${endTime - startTime}ms`);
})();

(async function () {
  const rootNode = {
    path: folderPath,
    type: 'folder',
    children: [],
    isRoot: true,
  };

  const nodes = {
    root: rootNode,
  };

  const startTime = Date.now();
  const files = traverseFolderObj({
    rootPath: folderPath,
    folderRelativePath: './',
    nodes,
    parentNode: rootNode,
  });
  const endTime = Date.now();
  console.log(`耗时${endTime - startTime}ms`);
})();

(async function () {
  const startTime = Date.now();
  const list = await asyncTraverseFolderList(folderPath);
  const endTime = Date.now();
  console.log(`共${list.length}个文件, 耗时${endTime - startTime}ms`);
})();
