const fs = require('fs');
const path = require('path');
const { readdir } = require('fs').promises;

const asyncTraverseFolderList = async (rootPath) => {
  const files = await readdir(rootPath);

  const list = await Promise.all(
    files.map(async (file) => {
      const absolutePath = path.resolve(rootPath, file);
      const stats = fs.statSync(absolutePath);
      if (stats.isFile()) {
        return absolutePath;
      }
      return asyncTraverseFolderList(absolutePath);
    })
  );

  return Array.prototype.concat(...list);
};

module.exports = { asyncTraverseFolderList };
