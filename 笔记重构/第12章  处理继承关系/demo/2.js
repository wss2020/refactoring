class Parent{
    constructor(num) {
        this.num = num;
    }
    add(){
        if(this.getNum){
            this.num = 0;
        }else{
            this.num +=1;
        }
    }
    get getNum(){
        return this.num === 5;
    }
}

class Child1 extends Parent{
    constructor(num) {
        super(num);
    }
}

class Child2 extends Parent{
    constructor(num) {
        super(num);
    }
    get getNum(){
        return this.num === 4;
    }
}

let child1 = new Child1(1);
let child2 = new Child2(1);
child1.add();child1.add();child1.add();child1.add();child1.add();
child2.add();child2.add();child2.add();child2.add();

console.log(child1.num);
console.log(child2.num);
