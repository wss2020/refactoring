
/**
 * 有鉴于此，我觉得更好的办法是先用提炼函数（106）把“选择哪个类来实例化”的逻辑提炼成工厂函数。
 * */
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
    let p;
    switch (aRecord.gender) {
        case 'M':
            p = new Male(aRecord.name);
            break;
        case 'F':
            p = new Female(aRecord.name);
            break;
        default:
            p = new Person(aRecord.name);
    }
    return p;
}

function loadFromInput(data) {
    const result = [];
    data.forEach(aRecord => {
        result.push(createPerson(aRecord));
    })
    return result;
}



// 客户端...
const numberOfMales = people.filter(p => p instanceof Male).length;

/**
   提炼完工厂函数后，我会对这两个函数做些清理。先用内联变量（123）简化createPerson函数：
 */













