/**
 然后用搬移函数（198）将其移到Person类。
 */
class Person {
    constructor(name) {
        this._name = name;
    }
    get name() { return this._name; }
    get genderCode() { return "X"; }
    get isMale() { return this instanceof Male; }
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



// 客户端...
const numberOfMales = people.filter(p => p.isMale ).length;


/**
    重构到这一步，所有与子类相关的知识都已经安全地包装在超类和工厂函数中。（对于“超类引用子类”这种情况，
 通常我会很警惕，不过这段代码用不了一杯茶的工夫就会被干掉，所以也不用太担心。）

    现在，添加一个字段来表示子类之间的差异。既然有来自别处的一个类型代码，直接用它也无妨。
 */
















