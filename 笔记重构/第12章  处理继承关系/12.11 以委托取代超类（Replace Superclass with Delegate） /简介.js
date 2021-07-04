//曾用名：以委托取代继承（Replace Inheritance with Delegation）

// 重构前
class List {}
class Stack extends List {}


// 重构后
class List {}
class Stack {
    constructor() {
        this._storage = new List();
    }
}

/**
 动机

    在面向对象程序中，通过继承来复用现有功能，是一种既强大又便捷的手段。我只要继承一个已有的类，覆写一些功能，再添加一些功能，就能达成目的。但继承也
 有可能造成困扰和混乱。

    在对象技术发展早期，有一个经典的误用继承的例子：让栈（stack）继承列表（list）。这个想法的出发点是想复用列表类的数据存储和操作能力。虽说复用是
 一件好事，但这个继承关系有问题：列表类的所有操作都会出现在栈类的接口上，然而其中大部分操作对一个栈来说并不适用。更好的做法应该是把列表作为栈的字段，
 把必要的操作委派给列表就行了。

    这就是一个用得上以委托取代超类手法的例子——如果超类的一些函数对子类并不适用，就说明我不应该通过继承来获得超类的功能。

    除了“子类用得上超类的所有函数”之外，合理的继承关系还有一个重要特征：子类的所有实例都应该是超类的实例，通过超类的接口来使用子类的实例应该完全不出
 问题。假如我有一个车模（car model）类，其中有名称、引擎大小等属性，我可能想复用这些特性来表示真正的汽车（car），并在子类上添加VIN编号、制造日期等
 属性。然而汽车终归不是模型。这是一种常见而又经常不易察觉的建模错误，我称之为“类型与实例名不符实”（type-instance homonym）[mf-tih]。

    在这两个例子中，有问题的继承招致了混乱和错误——如果把继承关系改为将部分职能委托给另一个对象，这些混乱和错误本是可以轻松避免的。使用委托关系能更清
 晰地表达“这是另一个东西，我只是需要用到其中携带的一些功能”这层意思。

    即便在子类继承是合理的建模方式的情况下，如果子类与超类之间的耦合过强，超类的变化很容易破坏子类的功能，我还是会使用以委托取代超类。这样做的缺点就
 是，对于宿主类（也就是原来的子类）和委托类（也就是原来的超类）中原本一样的函数，现在我必须在宿主类中挨个编写转发函数。不过还好，这种转发函数虽然写起
 来乏味，但它们都非常简单，几乎不可能出错。

    有些人在这个方向上走得更远，他们建议完全避免使用继承，但我不同意这种观点。如果符合继承关系的语义条件（超类的所有方法都适用于子类，子类的所有实例
 都是超类的实例），那么继承是一种简洁又高效的复用机制。如果情况发生变化，继承不再是最好的选择，我也可以比较容易地运用以委托取代超类。所以我的建议是，
 首先（尽量）使用继承，如果发现继承有问题，再使用以委托取代超类。
 */



/**
 做法
    在子类中新建一个字段，使其引用超类的一个对象，并将这个委托引用初始化为超类的新实例
    针对超类的每个函数，在子类中创建一个转发函数，将调用请求转发给委托引用。每转发一块完整逻辑，都要执行测试。
        大多数时候，每转发一个函数就可以测试，但一对设值/取值必须同时转移，然后才能测试。
    当所有超类函数都被转发函数覆写后，就可以去掉继承关系。
 */
