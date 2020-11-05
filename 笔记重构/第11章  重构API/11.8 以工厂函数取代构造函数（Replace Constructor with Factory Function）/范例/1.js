//又是那个单调乏味的例子：员工薪资系统。我还是以Employee类表示“员工”。
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

//使用它的代码有这样的： 调用方...
candidate = new Employee(document.name, document.empType);

//也有这样的： 调用方...
const leadEngineer = new Employee(document.leadEngineer, 'E');


//重构的第一步是创建工厂函数，其中把对象创建的责任直接委派给构造函数。

