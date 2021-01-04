
/**
 每当想要改变某个东西的表现形式时，我会先将当下的表现形式封装起来，从而尽量减小对客户端代码的影响。对于“创建子类对象”而言，
 封装的方式就是以工厂函数取代构造函数（334）。在这里，实现工厂有两种方式。

 最直接的方式是为每个构造函数分别创建一个工厂函数.
 */

class Person {
    constructor(name) {
        this._name = name;
    }
    get name() { return this._name; }
    get genderCode() { return "X"; }
}


// snip
class Male extends Person {
    get genderCode() { return "M"; }
}
class Female extends Person {
    get genderCode() { return "F"; }
}


function createPerson(name) {
    return new Person(name);
}
function createMale(name) {
    return new Male(name);
}
function createFemale(name) {
    return new Female(name)
}


// 客户端...
const numberOfMales = people.filter(p => p instanceof Male).length;



/**
 虽然这是最直接的选择，但这样的对象经常是从输入源加载出来，直接根据性别代码创建对象。
 */











