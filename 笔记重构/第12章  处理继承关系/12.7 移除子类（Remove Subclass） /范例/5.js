
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

/**
 提炼完工厂函数后，我会对这两个函数做些清理。先用内联变量（123）简化createPerson函数：
 */
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
    const result = [];
    data.forEach(aRecord => {
        result.push(createPerson(aRecord));
    })
    return result;
}



// 客户端...
const numberOfMales = people.filter(p => p instanceof Male).length;


/**
    再用以管道取代循环（231）简化loadFromInput函数：
 */














