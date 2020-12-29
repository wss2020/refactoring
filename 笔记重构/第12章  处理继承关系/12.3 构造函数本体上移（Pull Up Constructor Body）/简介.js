// 重构前
class Party {}
class Employee extends Party {
    constructor(name, id, monthlyCost) {
        super();
        this._id = id;
        this._name = name;
        this._monthlyCost = monthlyCost;
    }
}


// 重构后
class Party1 {
    constructor(name) {
        this._name = name;
    }
}
class Employee1 extends Party1 {
    constructor(name, id, monthlyCost) {
        super(name);
        this._id = id;
        this._monthlyCost = monthlyCost;
    }
}


/**
 动机
    构造函数是很奇妙的东西。它们不是普通函数，使用它们比使用普通函数受到更多的限制。

    如果我看见各个子类中的函数有共同行为，我的第一个念头就是使用提炼函数（106）将它们提炼到一个独立函数中，
 然后使用函数上移（350）将这个函数提升至超类。但构造函数的出现打乱了我的算盘，因为它们附加了特殊的规则，对
 一些做法与函数的调用次序有所限制。要对付它们，我需要略微不同的做法。

    如果重构过程过于复杂，我会考虑转而使用以工厂函数取代构造函数（334）。
 */



/**
 做法
    如果超类还不存在构造函数，首先为其定义一个。确保让子类调用超类的构造函数。
    使用移动语句（223）将子类中构造函数中的公共语句移动到超类的构造函数调用语句之后。
    逐一移除子类间的公共代码，将其提升至超类构造函数中。对于公共代码中引用到的变量，将其作为参数传递给超类的构造函数。
    测试。
    如果存在无法简单提升至超类的公共代码，先应用提炼函数（106），再利用函数上移（350）提升之。
 */














