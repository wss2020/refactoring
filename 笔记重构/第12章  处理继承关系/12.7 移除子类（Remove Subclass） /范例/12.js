/**
    类型代码的分配有点儿失衡，默认情况没有类型代码，这种情况让我很烦心。未来阅读代码的人会一直好奇背后的原因。
 所以我更愿意现在做点儿修改，给所有情况都平等地分配类型代码——只要不会引入额外的复杂性就好。
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
            return new Female(aRecord.name,"F");
        default:
            return new Person(aRecord.name,"X");
    }
}

function loadFromInput(data) {
    return data.map(aRecord => createPerson(aRecord));
}



// 客户端...
const numberOfMales = people.filter(p => p.isMale ).length;



















