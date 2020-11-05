//重构的第一步是创建工厂函数，其中把对象创建的责任直接委派给构造函数。
//顶层作用域...
function createEmployee(name, typeCode) {
    return new Employee(name, typeCode);
}
class Employee {
    constructor(name, typeCode) {
        this._name = name;
        this._typeCode = typeCode;
    }
    get name() {
        return this._name;
    }
    get type() {
        return Employee.legalTypeCodes[this._typeCode];
    }
    static get legalTypeCodes() {
        return {"E": "Engineer", "M": "Manager", "S": "Salesman"};
    }
}

//调用方...
candidate = new Employee(document.name, document.empType);
const leadEngineer = new Employee(document.leadEngineer, 'E');


//然后找到构造函数的调用者，并逐一修改它们，令其使用工厂函数。第一处的修改很简单。
