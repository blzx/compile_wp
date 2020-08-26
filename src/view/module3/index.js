import '../../css/index.css';
import $ from '../../js/jquery.min.js';
// import html from '../index.html';
// require('html-loader?-attributes!../index.html');
// require('html-loader?{"attributes":{"list":[{"tag":"img","attribute":"src","type":"src"},{"tag":"img","attribute":"data-src","type":"src"}]}}!../index.html');

// 在浏览器中 getElementByIdd 的报错位置指向打包后的dist目录
// 如果想指向源文件位置，则修改webpack.config.js中的 devtool:'source-map'
// var h3 = document.getElementByIdd('h3');

class Polygon {
    constructor(height, width) {
        this.name = 'Polygon';
        this.height = height;
        this.width = width;
    }
}
let p = new Polygon(1,3)
console.log(p)
class Square extends Polygon {
    constructor(length) {
        //继承父类的name、height、width属性；不传参属性值为undefined
        super(length, length);
        this.name = 'Square';
    }
}
let s = new Square(5)

$('h3').on('click',function(){
    alert('clicked!')
})