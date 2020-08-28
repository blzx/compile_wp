// import '../../css/module2.css' ;
// import $ from '../../js/jquery.min.js';
import $ from 'jquery';
// import _ from 'lodash';
// import la from '../non_entry'

// console.log(la)

import '../non_entry'


console.log($);
// console.log(_);

// let createEle = () =>{
// let getComponent = () => {
    // const element = document.createElement('div');
    // element.innerHTML = _.join(['Hello','webpack'], ' ');
    // document.body.appendChild(element);

//     // return import(/* webpackChunkName: "lodash" */ 'lodash').then(result => {
//     return import(/* webpackChunkName: "lodash" */ 'lodash').then(({default: _}) => {
//         // result: resolve(result)
//         // result: Module {__esModule: true, Symbol(Symbol.toStringTag): "Module"}
//                         // default: ƒ () // lodash 方法
//                         // Symbol(Symbol.toStringTag): "Module"
//                         // __esModule: true
//                         // get default: () => value
//         // {default: _} 相当于 let {dafault: _} = result; 形参解构赋值 重命名
//         // console.log(_) // _已经放到全局 不管有没有形参解构都能拿到
//         const element = document.createElement('div');
//         element.innerHTML = _.join(['Hello','Webpack'], ' ');
//         return element;
//     }).catch(error => 'An error occurred while loading the component')
// }


// 使用async 简化代码
// 不使用 splitChunk 以下 import 动态导入的模块也会自动拆分出来，
// 防止重复(每个引入lodash的模块都塞入一个lodash),优先级高于 splitChunk
// let getComponent = async() => {
//     const element = document.createElement('div');
//     const {default: _} = await import(/* webpackChunkName: "lodash" */ 'lodash' )
//     // /* webpackChunkName: "lodash" */  这种写法让 bundle 被命名为 lodash.bundle.js ，
//     // 而不是 [id].bundle.js(node_modules_lodash_lodash_js.bundle.js)
//     element.innerHTML = _.join(['Hello','Webpack'], ' ');
//     return element;
// }

let getCss = async() => {
    await import('../../css/module2.css' )
}

// createEle();

// getComponent().then(element => {
//     document.body.appendChild(element)
// })

getCss();


