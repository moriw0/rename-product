import { renameFunction } from './rename.js';
import { fetchProductId } from './fetch.js';


// const id =  fetchProductId();
fetchProductId();
// renameFunction(id);

// new Promise((resolve) => {
//   const id = fetchProductId();
//   return id
// }).then((id) => {
//   renameFunction(id);
// });

// console.log("1番目");

// // お約束を取り付けたい処理にPromise
// new Promise((resolve) => {
//   //1秒後に実行する処理
//   setTimeout(() => {
//     const id =  fetchProductId();
//     console.log("2番目(1秒後に実行)");
//     //無事処理が終わったことを伝える
//     resolve(id);
//   }, 1000);
// }).then((id) => {
//   // 処理が無事終わったことを受けとって実行される処理
//   renameFunction(id);
//   console.log("3番目");
// });
