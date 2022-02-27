const os = require('os');
const path = require('path');
const { asyncTraverseFolderList } = require('./asyncTraverseFolderList');

const folderPath = path.resolve(os.homedir(), 'code');

(async function () {
  const startTime = Date.now();
  const aaa = await asyncTraverseFolderList(folderPath);
  const endTime = Date.now();
  console.log(`共${aaa.length}个文件, 耗时${endTime - startTime}ms`);
})();
