// 本例从两个类开始，代表“人”的Person和代表“部门”的Department。
class Person {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    get department() {
        return this._department;
    }
    set department(arg) {
        this._department = arg;
    }
}

class Department{
    get chargeCode() {return this._chargeCode;}
    set chargeCode(arg) {this._chargeCode = arg;}
    get manager() {return this._manager;}
    set manager(arg) {this._manager = arg;}
}

// 有些客户端希望知道某人的经理是谁，为此，它必须先取得Department对象。

// 客户端代码...
manager = aPerson.department.manager;


/**
    这样的编码就对客户端揭露了Department的工作原理，于是客户知道：Department负责追踪“经理”这条信息。
 如果对客户隐藏Department，可以减少耦合。为了这一目的，我在Person中建立一个简单的委托函数。
 */

