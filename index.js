const os = require('os');
const path = require('path');
const { traverseFolderList } = require('./traverseFolderList');
const { asyncTraverseFolderList } = require('./asyncTraverseFolderList');

const folderPath = path.resolve(os.homedir(), 'code');

function test1() {
  const list = [];
  const startTime = Date.now();
  traverseFolderList(folderPath, list);
  const endTime = Date.now();
  console.log(`共${list.length}个文件, 耗时${endTime - startTime}ms`);
  return endTime - startTime;
}

let time1 = 0;
for (let i = 0; i < 10; i++) {
  time1 += test1();
}
console.log(`平均耗时：${time1 / 10}ms`);

async function test2() {
  const startTime = Date.now();
  const list = await asyncTraverseFolderList(folderPath);
  const endTime = Date.now();
  console.log(`共${list.length}个文件, 耗时${endTime - startTime}ms`);
  return endTime - startTime;
}

(async function () {
  let time2 = 0;
  for (let i = 0; i < 10; i++) {
    time2 += await test2();
  }
  console.log(`平均耗时：${time2 / 10}ms`);
})();
