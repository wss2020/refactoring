class Employee {
    constructor(name, type) {
        this.validateType(type);
        this._name = name;
        this.type = type;
    }
    validateType(arg) {
        if (!["engineer", "manager", "salesman"].includes(arg))
            throw new Error(`Employee cannot be of type ${arg}`);
    }

    get typeString(){ return this._type.toString() }
    get type() { return this._type; }
    set type(arg) { this._type = new EmployeeType(arg); }

    get capitalizedType() {
        return this.typeString.charAt(0).toUpperCase() + this.typeString.substr(1).toLowerCase();
    }
    toString() {
        return `${this._name} (${this.capitalizedType})`;
    }
}


// 首先，我用以对象取代基本类型（174）包装类型码。
class EmployeeType {
    constructor(aString) {
        this._value = aString;
    }

    toString() {
        return this._value;
    }
}


// 然后使用以子类取代类型码（362）的老套路，把员工类别代码变成子类。





















let result = new Employee("wss", "engineer");
console.log(result.toString());









