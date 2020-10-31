
let a = [1,52,638,582];
console.log(a);        // [ 1, 52, 638, 582 ]
console.log(...a);     // 1 52 638 582
let result = Math.min(...a);
console.log(result);


let b = [
    {name:'wss', age:'25'},
    {name:'blue', age:'555'},
];
console.log(b);         // [ { name: 'wss', age: '25' }, { name: 'blue', age: '555' } ]
console.log(...b);      // { name: 'wss', age: '25' } { name: 'blue', age: '555' }


function sum(x, y, z) {
    return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers));
// expected output: 6
console.log(sum.apply(null, numbers));
// expected output: 6


