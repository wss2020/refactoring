
/**
 虽然这是最直接的选择，但这样的对象经常是从输入源加载出来，直接根据性别代码创建对象。
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

function loadFromInput(data) {
    const result = [];
    data.forEach(aRecord => {
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
        result.push(p);
    });
    return result;
}



// 客户端...
const numberOfMales = people.filter(p => p instanceof Male).length;

/**
 * 有鉴于此，我觉得更好的办法是先用提炼函数（106）把“选择哪个类来实例化”的逻辑提炼成工厂函数。
 * */













