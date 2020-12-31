/**
 我选择从工程师（"engineer"）这个类型码开始重构。我打算采用直接继承的方案，也就是继承Employee类。
 子类很简单，只要覆写类型码的取值函数，返回适当的字面量值就行了。
 */
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

class Engineer extends Employee {
    get type() {
        return "engineer";
    }
}


/**
     虽然JavaScript的构造函数也可以返回其他对象，但如果把选择器逻辑放在这儿，它会与字段初始化逻辑相互纠缠，搞得一团混乱。
 所以我会先运用以工厂函数取代构造函数（334），新建一个工厂函数以便安放选择器逻辑。
 */
function createEmployee(name, type) {
    return new Employee(name, type);
}


// 然后我把选择器逻辑放在工厂函数中，从而开始使用新的子类。


let result = createEmployee("wss","engineer");
console.log( result.toString() );
