// 再次测试，然后再搬移对电话号码的取值函数
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
    get telephoneNumber() {
        return this._telephoneNumber.telephoneNumber;
    }

    get name() {  return this._name; }
    set name(arg) { this._name = arg; }
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
    get telephoneNumber() {
        return `(${this.officeAreaCode}) ${this.officeNumber}`;
    }
}


//现在我需要做些清理工作。“电话号码”显然不该拥有“办公室”（office）的概念，因此我得重命名一下变量。
