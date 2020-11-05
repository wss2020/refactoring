/**
    所有创建Person对象的地方都要如此修改，每次修改之后要执行测试。
    全部修改完成后，就可以用内联函数（115）消去设值函数。
 */
class Person {
    constructor(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(arg) {
        this._name = arg;
    }
    get id() {
        return this._id;
    }
}

const martin = new Person("1234");
martin.name = "martin";



// 注意
console.log(martin);
console.log(martin._id);
martin._id = 2222;
console.log(martin);




