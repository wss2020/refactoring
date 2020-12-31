//  这个员工管理系统的例子已经被用烂了……
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

    toString() {
        return `${this._name} (${this._type})`;
    }
}


// 第一步是用封装变量（132）将类型码自封装起来。


let result = new Employee("wss","engineer");
console.log( result.toString() );
