// 一开始，代码中遗留了两个子类。
class Person {
    constructor(name) {
        this._name = name;
    }
    get name() { return this._name; }
    get genderCode() { return "X"; }
}


// snip
class Male extends Person {
    get genderCode() { return "M"; }
}
class Female extends Person {
    get genderCode() { return "F"; }
}

/**
    如果子类就干这点儿事，那真的没必要存在。不过，在移除子类之前，通常有必要检查使用方代码是否有依赖于特定子类的行为，
 这样的行为需要被搬移到子类中。在这个例子里，我找到一些客户端代码基于子类的类型做判断，不过这也不足以成为保留子类的理由。
 */

// 客户端...
const numberOfMales = people.filter(p => p instanceof Male).length;



/**
    每当想要改变某个东西的表现形式时，我会先将当下的表现形式封装起来，从而尽量减小对客户端代码的影响。对于“创建子类对象”而言，
 封装的方式就是以工厂函数取代构造函数（334）。在这里，实现工厂有两种方式。

 最直接的方式是为每个构造函数分别创建一个工厂函数
 */












