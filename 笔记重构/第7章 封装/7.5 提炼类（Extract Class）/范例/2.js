//易如反掌！接着，我要在构造Person类时创建TelephoneNumber类的一个实例。
class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber();
    }

    get officeAreaCode() { return this._officeAreaCode;  }
    set officeAreaCode(arg) {  this._officeAreaCode = arg;  }

    get name() {  return this._name; }
    set name(arg) { this._name = arg; }
    get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`;  }
    get officeNumber() { return this._officeNumber;  }
    set officeNumber(arg) {  this._officeNumber = arg;  }
}

class TelephoneNumber {
    get officeAreaCode() {
        return this._officeAreaCode;
    }

    set officeAreaCode(arg) {
        this._officeAreaCode = arg;
    }
}

//现在，我运用搬移字段（207）搬移一个字段。


