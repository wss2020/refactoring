
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

function createPerson(aRecord) {
    switch (aRecord.gender) {
        case 'M':
            return new Male(aRecord.name);
        case 'F':
            return new Female(aRecord.name);
        default:
            return new Person(aRecord.name);
    }
}

function loadFromInput(data) {
    return data.map(aRecord => createPerson(aRecord));
}


/**
 工厂函数封装了子类的创建逻辑，但代码中还有一处用到instanceof运算符——这从来不会是什么好味道。
 我用提炼函数（106）把这个类型检查逻辑提炼出来。
 */
// 客户端...
function isMale(aPerson) {
    return aPerson instanceof Male;
}
const numberOfMales = people.filter(p => isMale(p)).length;



/**
    然后用搬移函数（198）将其移到Person类。
 */















