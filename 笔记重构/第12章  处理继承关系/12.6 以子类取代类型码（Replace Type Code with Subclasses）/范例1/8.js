// 现在，构造函数的类型参数已经没用了，用改变函数声明（124）把它干掉。
class Employee {
    constructor(name) {
        this._name = name;
    }

    toString() {
        return `${this._name} (${this.type})`;
    }
}

class Engineer extends Employee {
    get type() {
        return "engineer";
    }
}

class Salesman extends Employee {
    get type() {
        return "salesman";
    }
}

class Manager extends Employee {
    get type() {
        return "manager";
    }
}

function createEmployee(name, type) {
    switch (type) {
        case "engineer":
            return new Engineer(name, type);
        case "salesman":
            return new Salesman(name, type);
        case "manager":
            return new Manager(name, type);
        default:
            throw new Error(`Employee cannot be of type ${type}`);
    }
}

/**
    子类中获取类型码的访问函数——get type函数——仍然留着。通常我会希望把这些函数也干掉，不过可能需要多花点儿时间，
 因为有其他函数使用了它们。我会用以多态取代条件表达式（272）和函数下移（359）来处理这些访问函数。到某个时候，已经
 没有代码使用类型码的访问函数了，我再用移除死代码（237）给它们送终。
 */


let result = createEmployee("wss", "engineer");
console.log(result.toString());

