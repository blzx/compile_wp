var ajs = function() {
    console.log('ajs')
}
// exports.ajs = ajs;
// console.log('exports',exports);
// // exports { ajs: [Function: ajs] }
// console.log('module.exports',module.exports)
// // module.exports { ajs: [Function: ajs] }

// console.log(exports == module.exports);
// // true   exports可以理解为module.exports的一个引用，指向module.exports （var exports = module.exports）

module.exports = ajs;
console.log('module.exports',module.exports)
// module.exports [Function: ajs]  返回的时模块对象本身
console.log('exports',exports)
// {}
console.log(module.exports == exports)
// false