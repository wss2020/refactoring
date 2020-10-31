//原码
// 下面这个全局变量中保存了一些有用的数据：
let defaultOwner = {firstName: "Martin", lastName: "Fowler"};

// 使用它的代码平淡无奇：
spaceship.owner = defaultOwner;

// 更新这段数据的代码是这样：
defaultOwner = {firstName: "Rebecca", lastName: "Parsons"};



//重构
let defaultOwnerData = {firstName: "Martin", lastName: "Fowler"};
class Person {
    constructor(data) {
        this._lastName = data.lastName;
        this._firstName = data.firstName
    }

    get lastName() {
        return this._lastName;
    }

    get firstName() {
        return this._firstName;
    }
}
export function defaultOwner() {
    return new Person(defaultOwnerData);
}
export function setDefaultOwner(arg) {
    defaultOwnerData = arg;
}
//使用






















