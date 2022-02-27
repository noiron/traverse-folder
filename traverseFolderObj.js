const fs = require('fs');
const path = require('path');

/**
 * 以同步方式遍历，返回文件树结构的对象
 * @param {Object} param0
 * @param {string} param0.rootPath 这个文件夹的根目录
 * @param {string} param0.folderRelativePath 正在遍历的这个文件夹相对于根目录的相对路径
 * @param {*} param0.nodes 要保存的数据内容，以相对路径为 key
 * @param {*} param0.parentNode 当前文件的父级文件夹，遍历时需要修改 parent 的 children 属性
 * @returns
 */
const traverseFolderObj = ({
  rootPath,
  folderRelativePath,
  nodes,
  parentNode,
}) => {
  const files = fs.readdirSync(path.resolve(rootPath, folderRelativePath));

  files.forEach((file) => {
    const absolutePath = path.resolve(rootPath, folderRelativePath, file);
    const relativePath = path.relative(rootPath, absolutePath);
    const stats = fs.statSync(absolutePath);

    if (stats.isFile()) {
      nodes[relativePath] = {
        path: relativePath,
        type: 'file',
      };
      parentNode.children.push(relativePath);
    }
    if (stats.isDirectory()) {
      const newParent = {
        path: relativePath,
        type: 'folder',
        children: [],
      };

      traverseFolderObj({
        rootPath,
        folderRelativePath: relativePath,
        nodes,
        parentNode: newParent,
      });
      nodes[relativePath] = newParent;
      parentNode.children.push(relativePath);
    }
  });

  return nodes;
};

module.exports = { traverseFolderObj };
