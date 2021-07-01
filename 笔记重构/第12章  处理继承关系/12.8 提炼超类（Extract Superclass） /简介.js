
// 重构前
class Department {
    get totalAnnualCost() {}
    get name() {}
    get headCount() {}
}
class Employee {
    get annualCost() {}
    get name() {}
    get id() {}
}


// 重构后
class Party {
    get name() {}
    get annualCost() {}
}

class Department1 extends Party {
    get annualCost() {}
    get headCount() {}
}

class Employee1 extends Party {
    get annualCost() {}
    get id() {}
}




/**
 动机
    如果我看见两个类在做相似的事，可以利用基本的继承机制把它们的相似之处提炼到超类。我可以用字段上移（353）把相同的数据搬到超类，
 用函数上移（350）搬移相同的行为。

     很多技术作家在谈到面向对象时，认为继承必须预先仔细计划，应该根据“真实世界”的分类结构建立对象模型。真实世界的分类结构可以作为
 设计继承关系的提示，但还有很多时候，合理的继承关系是在程序演化的过程中才浮现出来的：我发现了一些共同元素，希望把它们抽取到一处，于
 是就有了继承关系。

     另一种选择就是提炼类（182）。这两种方案之间的选择，其实就是继承和委托之间的选择，总之目的都是把重复的行为收拢一处。提炼超类
 通常是比较简单的做法，所以我会首选这个方案。即便选错了，也总有以委托取代超类（399）这瓶后悔药可吃。
 */




/**
 做法
    为原本的类新建一个空白的超类。
        如果需要的话，用改变函数声明（124）调整构造函数的签名。

    测试。

    使用构造函数本体上移（355）、函数上移（350）和字段上移（353）手法，逐一将子类的共同元素上移到超类。

    检查留在子类中的函数，看它们是否还有共同的成分。如果有，可以先用提炼函数（106）将其提炼出来，再用函数上移（350）搬到超类。

    检查所有使用原本的类的客户端代码，考虑将其调整为使用超类的接口。
 */




