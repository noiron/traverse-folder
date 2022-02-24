const fs = require('fs');
const path = require('path');

/**
 * 以同步方式遍历，返回文件的列表
 * @param {*} rootPath 
 * @param {*} list 
 * @returns 
 */
const traverseFolderList = (rootPath, list) => {
  const files = fs.readdirSync(rootPath);

  files.forEach((file) => {
    const absolutePath = path.resolve(rootPath, file);
    const stats = fs.statSync(absolutePath);

    if (stats.isFile()) {
      list.push(absolutePath);
    }

    if (stats.isDirectory()) {
      traverseFolderList(absolutePath, list);
    }
  });

  return list;
};

module.exports = { traverseFolderList };
