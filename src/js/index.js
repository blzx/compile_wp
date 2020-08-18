import '../css/index.css';
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