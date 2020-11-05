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

//然后找到构造函数的调用者，并逐一修改它们，令其使用工厂函数。第一处的修改很简单。
//调用方...
candidate = createEmployee(document.name, document.empType);


//调用方...
const leadEngineer = new Employee(document.leadEngineer, 'E');


//第二处则可以这样使用工厂函数。调用方...
