// 测试，确保一切工作正常，我就可以移除验证逻辑，因为分发逻辑做的是同一回事。
class Employee {
    constructor(name, type) {
       // this.validateType(type);
        this._name = name;
    }

    validateType(arg) {
        if (!["engineer", "manager", "salesman"].includes(arg))
            throw new Error(`Employee cannot be of type ${arg}`);
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
    // return new Employee(name, type);
}


// 现在，构造函数的类型参数已经没用了，用改变函数声明（124）把它干掉。





let result = createEmployee("wss", "engineer");
console.log(result.toString());

