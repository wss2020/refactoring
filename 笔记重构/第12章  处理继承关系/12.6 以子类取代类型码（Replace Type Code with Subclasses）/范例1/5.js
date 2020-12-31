class Employee {
    constructor(name, type) {
        this.validateType(type);
        this._name = name;
        this._type = type;
    }

    validateType(arg) {
        if (!["engineer", "manager", "salesman"].includes(arg))
            throw new Error(`Employee cannot be of type ${arg}`);
    }

    get type() {
        return this._type;
    }

    toString() {
        return `${this._name} (${this.type})`;
    }
}

/**
 测试，确保一切运转正常。不过由于我的偏执，我随后会修改Engineer类中覆写的type函数，让它返回另外一个值，
 再次执行测试，确保会有测试失败，这样我才能肯定：新建的子类真的被用到了。然后我把type函数的返回值改回正确的
 状态，继续处理别的类型。我一次处理一个类型，每次修改后都执行测试。
 */
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

// 全部修改完成后，我就可以去掉类型码字段及其在超类中的取值函数（子类中的取值函数仍然保留）。



let result = createEmployee("wss","engineer");
console.log( result.toString() );


