//现在，我运用搬移字段（207）搬移一个字段。
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

    get officeNumber() { return this._officeNumber;  }
    set officeNumber(arg) {  this._officeNumber = arg;  }

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
}

//再次运行测试，然后我对下一个字段进行同样处理。


