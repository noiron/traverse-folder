const os = require('os');
const path = require('path');
const { traverseFolderObj } = require('./traverseFolderObj');

// const folderPath = path.resolve(os.homedir(), 'code');
const folderPath = path.resolve(__dirname, './1');

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
  console.log(nodes);
})();
