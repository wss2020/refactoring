
/**
 如果重构到此为止的话，空的EmployeeType类可以去掉。但我更愿意留着它，用来明确表达各个子类之间的关系。
 并且有一个超类，也方便把其他行为搬移进去，
 例如我专门放在toString函数里的“名字大写”逻辑，就可以搬到超类。
 */
class Employee {
    constructor(name, type) {
        this._name = name;
        this.type = type;
    }

    static createEmployeeType(aString) {
        switch (aString) {
            case "engineer":
                return new Engineer();
            case "manager":
                return new Manager();
            case "salesman":
                return new Salesman()
            default:
                throw new Error(`Employee cannot be of type ${aString}`);
        }
    }

    get typeString(){ return this._type.toString() }
    get type() { return this._type; }
    set type(arg) {
        this._type = Employee.createEmployeeType(arg);
    }

    toString() {
        return `${this._name} (${this.type.capitalizedType})`;
    }
}


class EmployeeType {
    get capitalizedType() {
        return this.toString().charAt(0).toUpperCase() + this.toString().substr(1).toLowerCase();
    }
}

class Engineer extends EmployeeType{
    toString() { return "engineer"; }
}

class Salesman extends EmployeeType{
    toString() { return "salesman";}
}

class Manager extends EmployeeType{
    toString() { return "manager"; }
}




let result = new Employee("wss", "engineer");
console.log(result.toString());







