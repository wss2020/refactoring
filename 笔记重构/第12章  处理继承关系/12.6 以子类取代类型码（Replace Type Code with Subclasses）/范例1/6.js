// 全部修改完成后，我就可以去掉类型码字段及其在超类中的取值函数（子类中的取值函数仍然保留）。
class Employee {
    constructor(name, type) {
        this.validateType(type);
        this._name = name;
       // this._type = type;
    }

    validateType(arg) {
        if (!["engineer", "manager", "salesman"].includes(arg))
            throw new Error(`Employee cannot be of type ${arg}`);
    }

   // get type() { return this._type; }

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
    }
    return new Employee(name, type);
}

// 测试，确保一切工作正常，我就可以移除验证逻辑，因为分发逻辑做的是同一回事。


let result = createEmployee("wss","engineer");
console.log( result.toString() );

