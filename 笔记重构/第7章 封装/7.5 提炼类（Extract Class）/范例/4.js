//再次运行测试，然后我对下一个字段进行同样处理。
class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber();
    }
    get officeAreaCode() {
        return this._telephoneNumber.officeAreaCode;
    }
    set officeAreaCode(arg) {
        this._telephoneNumber.officeAreaCode = arg;
    }
    get officeNumber() {
        return this._telephoneNumber.officeNumber;
    }
    set officeNumber(arg) {
        this._telephoneNumber.officeNumber = arg;
    }

    get name() {  return this._name; }
    set name(arg) { this._name = arg; }
    get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`;  }
}

class TelephoneNumber {
    get officeAreaCode() {
        return this._officeAreaCode;
    }
    set officeAreaCode(arg) {
        this._officeAreaCode = arg;
    }
    get officeNumber() {
        return this._officeNumber;
    }
    set officeNumber(arg) {
        this._officeNumber = arg;
    }
}

// 再次测试，然后再搬移对电话号码的取值函数
