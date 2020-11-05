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


candidate = createEmployee(document.name, document.empType);

//第二处则可以这样使用工厂函数。调用方...
const leadEngineer = createEmployee(document.leadEngineer, 'E');

/**
    但我不喜欢这里的类型码——以字符串字面量的形式传入类型码，一般来说都是坏味道。所以我更愿意再
 新建一个工厂函数，把“员工类别”的信息嵌在函数名里体现。。
 */
