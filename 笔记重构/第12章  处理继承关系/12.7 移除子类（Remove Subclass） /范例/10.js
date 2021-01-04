/**
     在初始化时先将其设置为默认值。（顺便说一句，虽然大多数人可以归类为男性或女性，但确实有些人不是这两种性别中的任何一种。
 忽视这些人的存在，是一个常见的建模错误。）

    首先从“男性”的情况开始，将相关逻辑折叠到超类中。为此，首先要修改工厂函数，令其返回一个Person对象，然后修改所有
 instanceof检查逻辑，改为使用性别代码字段。
 */
class Person {
    constructor(name,genderCode) {
        this._name = name;
        this._genderCode = genderCode || "X";
    }

    get name() { return this._name; }
    get genderCode() {return this._genderCode;}
    get isMale() {return "M" === this._genderCode;}
}


// snip
class Male extends Person {
    get genderCode() { return "M"; }
}
class Female extends Person {
    get genderCode() { return "F"; }
}

function createPerson(aRecord) {
    switch (aRecord.gender) {
        case 'M':
            return new Male(aRecord.name,"M");
        case 'F':
            return new Female(aRecord.name);
        default:
            return new Person(aRecord.name);
    }
}

function loadFromInput(data) {
    return data.map(aRecord => createPerson(aRecord));
}



// 客户端...
const numberOfMales = people.filter(p => p.isMale ).length;


/**
    此时我可以测试，删除Male子类，再次测试，然后对Female子类也如法炮制。
 */
















