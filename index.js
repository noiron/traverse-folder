const os = require('os');
const path = require('path');
const { traverseFolderList } = require('./traverseFolderList');
const { asyncTraverseFolderList } = require('./asyncTraverseFolderList');

// 可以任选一个文件夹用于测试
const folderPath = path.resolve(os.homedir(), 'code');

function test1() {
  const list = [];
  const startTime = Date.now();
  traverseFolderList(folderPath, list);
  const endTime = Date.now();
  const duration = endTime - startTime;
  console.log(`同步 - 共${list.length}个文件, 耗时${duration}ms`);
  return duration;
}

async function test2() {
  const startTime = Date.now();
  const list = await asyncTraverseFolderList(folderPath);
  const endTime = Date.now();
  const duration = endTime - startTime;
  console.log(`异步 - 共${list.length}个文件, 耗时${duration}ms`);
  return duration;
}

async function runTest(fn, count) {
  let time = 0;
  for (let i = 0; i < count; i++) {
    time += await fn();
  }
  console.log(`${fn.name} 共运行${count}次，平均耗时：${time / count}ms`);
}

(async function () {
  const COUNT = 10;
  await runTest(test1, COUNT);
  await runTest(test2, COUNT);
})();
