//设想一个代表“人”的Person类，其中包含一个代表“电话号码”的TelephoneNumber对象。
class PersonP {
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
}


/*
   代码的当前状态是提炼类（182）留下的结果：从前拥有电话号码信息的Person类仍然有一些函数在修改新对象的属性。趁着还只有一个指向新类的引用，现在是时
候使用  将引用对象改为值对象  将其变成值对象。

   我需要做的第一件事是把TelephoneNumber类变成不可变的。对它的字段运用移除设值函数（331）。
     移除设值函数（331）的第一步是，用改变函数声明（124）把这两个字段的初始值加到构造函数中，并迫使构造函数调用设值函数。

 */
class TelephoneNumber {
    constructor(areaCode, number) {
        this._areaCode = areaCode;
        this._number = number;
    }
}

//然后我会逐一查看设值函数的调用者，并将其改为重新赋值整个对象。先从“地区代码”（area code）开始。
class Person {
    get officeAreaCode() {
        return this._telephoneNumber.areaCode;
    }
    set officeAreaCode(arg) {
        this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
    }
    get officeNumber() {
        return this._telephoneNumber.number;
    }
    set officeNumber(arg) {
        this._telephoneNumber.number = arg;
    }
}

//对于其他字段，重复上述步骤。
class Person {
    get officeAreaCode() {
        return this._telephoneNumber.areaCode;
    }
    set officeAreaCode(arg) {
        this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
    }
    get officeNumber() {
        return this._telephoneNumber.number;
    }
    set officeNumber(arg) {
        this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
    }
}

/*
   现在，TelephoneNumber已经是不可变的类，可以将其变成真正的值对象了。是不是真正的值对象，要看是否基于值判断相等性。
       在这个领域中，JavaScript做得不好：语言和核心库都不支持将“基于引用的相等性判断”换成“基于值的相等性判断”。
   我唯一能做的就是创建自己的equals函数。
 */

class TelephoneNumber {
    equals(other) {
        if (!(other instanceof TelephoneNumber)) return false;
        return this.areaCode === other.areaCode && this.number === other.number;
    }
}
//对其进行测试很重要：
it('telephone equals', function() {
    assert(​new TelephoneNumber("312", "555-0142").equals(new TelephoneNumber("312", "555-0142")));
});


/*
   这段测试代码用了不寻常的格式，是为了帮助读者一眼看出上下两次构造函数调用完全一样。

   我在这个测试中创建了两个各自独立的对象，并验证它们相等。

   在大多数面向对象语言中，内置的相等性判断方法可以被覆写为基于值的相等性判断。
   在Ruby中，我可以覆写==运算符；在Java中，我可以覆写Object.equals()方法。
   在覆写相等性判断的同时，我通常还需要覆写生成散列码的方法（例如Java中的Object.hashCode()方法），以确保用到散列码的集合在使用值对象时一切正常。

   如果有多个客户端使用了TelephoneNumber对象，重构的过程还是一样，只是在运用移除设值函数（331）时要修改多处客户端代码。另外，有必要添加几个测试，
检查电话号码不相等以及与非电话号码和null值比较相等性等情况。
 */





























