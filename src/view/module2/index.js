import $ from '../../js/jquery.min.js';
// import _ from 'lodash';

console.log($);
console.log(_);

let createEle = () =>{
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello','webpack'], ' ');
    document.body.appendChild(element);
}

createEle();


