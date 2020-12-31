// 第一步是用封装变量（132）将类型码自封装起来。
// 请注意，toString函数的实现中去掉了this._type的下划线，改用新建的取值函数了。
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
    我选择从工程师（"engineer"）这个类型码开始重构。我打算采用直接继承的方案，也就是继承Employee类。
 子类很简单，只要覆写类型码的取值函数，返回适当的字面量值就行了。
 */


let result = new Employee("wss","engineer");
console.log( result.toString() );
