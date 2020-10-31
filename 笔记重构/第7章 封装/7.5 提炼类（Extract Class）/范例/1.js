//我们从一个简单的Person类开始。
class Person {
    get name() {  return this._name; }
    set name(arg) { this._name = arg; }
    get telephoneNumber() { return `(${this.officeAreaCode}) ${this.officeNumber}`;  }
    get officeAreaCode() { return this._officeAreaCode;  }
    set officeAreaCode(arg) {  this._officeAreaCode = arg;  }
    get officeNumber() { return this._officeNumber;  }
    set officeNumber(arg) {  this._officeNumber = arg;  }
}
/**
    这里，我可以将与电话号码相关的行为分离到一个独立的类中。首先，我要定义一个空的TelephoneNumber类来
 表示“电话号码”这个概念：
 */
class TelephoneNumber {

}
//易如反掌！接着，我要在构造Person类时创建TelephoneNumber类的一个实例。
