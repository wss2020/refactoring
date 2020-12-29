class Parent{
    constructor(data) {
        this.name = data.name;
        this.age = data.age;
        this.sex = data.sex;
        this.like = '书法'
    }
}

class Child1 extends Parent{
    constructor(data) {
        super(data);
    }
}

class Child2 extends Parent{
    constructor(data) {
        super(data);
    }
}

let child1 = new Child1({name:'zs',age:12,sex:'男'})
let child2 = new Child2({name:'xy',age:28,sex:'女'})

console.log( child1.name );
console.log( child1.age );
console.log( child1.like );

console.log( child2.name );
console.log( child2.sex );
console.log( child2.like );
