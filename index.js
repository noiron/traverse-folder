const os = require('os');
const path = require('path');
const { traverseFolderList } = require('./traverseFolderList');
const { asyncTraverseFolderList } = require('./asyncTraverFolderList');

const folderPath = path.resolve(os.homedir(), 'code');

(function () {
  const list = [];
  const startTime = Date.now();
  traverseFolderList(folderPath, list);
  const endTime = Date.now();
  console.log(`共${list.length}个文件, 耗时${endTime - startTime}ms`);
})();

(async function () {
  const startTime = Date.now();
  const list = await asyncTraverseFolderList(folderPath);
  const endTime = Date.now();
  console.log(`共${list.length}个文件, 耗时${endTime - startTime}ms`);
})();
