function sum() {
    return this.a + this.b + this.c;
}
var o = {
    a: 1,
    b: 2,
    c: 3,
    get average() {
        return (this.a + this.b + this.c) / 3;
    }
};


Object.defineProperty(
    o,
    'sum',
    {
        get: sum, enumerable: true, configurable: true
    });
console.log(o.average, o.sum); // logs 2, 6
