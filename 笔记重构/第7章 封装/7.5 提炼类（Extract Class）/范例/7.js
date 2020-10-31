/**
 TelephoneNumber类上有一个对自己（telephone number）的取值函数也没什么道理，因此我又对它应用
 函数改名（124）。
 */
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
        return this._telephoneNumber.toString();
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
    toString() {
        return `(${this.areaCode}) ${this.number}`;
    }
}


/**
    “电话号码”对象一般还具有复用价值，因此我考虑将新提炼的类暴露给更多的客户端。需要访问TelephoneNumber
 对象时，只须把Person类中那些office开头的访问函数搬移过来并略作修改即可。但这样TelephoneNumber就更像
 一个值对象（Value  Object）[mf-vo]了，因此我会先对它使用将引用对象改为值对象（252）（那个重构手法所用
 的范例，正是基于本章电话号码例子的延续）。
 */
