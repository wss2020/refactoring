//现在我需要做些清理工作。“电话号码”显然不该拥有“办公室”（office）的概念，因此我得重命名一下变量。
class Person {
    constructor() {
        this._telephoneNumber = new TelephoneNumber();
    }
    get officeAreaCode() {
        return this._telephoneNumber.areaCode;
    }
    set officeAreaCode(arg) {
        this._telephoneNumber.areaCode = arg;
    }
    get officeNumber() {
        return this._telephoneNumber.number;
    }
    set officeNumber(arg) {
        this._telephoneNumber.number = arg;
    }
    get telephoneNumber() {
        return this._telephoneNumber.telephoneNumber;
    }

    get name() {  return this._name; }
    set name(arg) { this._name = arg; }
}

class TelephoneNumber {
    get areaCode() {
        return this._areaCode;
    }
    set areaCode(arg) {
        this._areaCode = arg;
    }
    get number() {
        return this._number;
    }
    set number(arg) {
        this._number = arg;
    }
    get telephoneNumber() {
        return `(${this.areaCode}) ${this.number}`;
    }
}


/**
    TelephoneNumber类上有一个对自己（telephone number）的取值函数也没什么道理，因此我又对它应用
 函数改名（124）。
*/
