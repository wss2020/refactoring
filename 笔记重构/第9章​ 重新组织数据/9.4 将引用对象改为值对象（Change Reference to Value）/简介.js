// 反向重构：将值对象改为引用对象（256）
//修改前
class Product {
    applyDiscount(arg) {
        this._price.amount -= arg;
    }
}


//修改后
class Product {
    applyDiscount(arg) {
        this._price = new Money(this._price.amount - arg, this._price.currency);
    }
}


/**
动机

   在把一个对象（或数据结构）嵌入另一个对象时，位于内部的这个对象可以被视为引用对象，也可以被视为值对象。
   两者最明显的差异在于如何更新内部对象的属性：
       1）如果将内部对象视为引用对象，在更新其属性时，我会保留原对象不动，更新内部对象的属性；
       2）如果将其视为值对象，我就会替换整个内部对象，新换上的对象会有我想要的属性值。

   如果把一个字段视为值对象，我可以把内部对象的类也变成值对象[mf-vo]。

   值对象通常更容易理解，主要因为它们是不可变的。一般说来，不可变的数据结构处理起来更容易。我可以放心地把不可变的数据值传给程序的其他部分，而不必担心
对象中包装的数据被偷偷修改。我可以在程序各处复制值对象，而不必操心维护内存链接。值对象在分布式系统和并发系统中尤为有用。

   值对象和引用对象的区别也告诉我，何时不应该使用本重构手法。如果我想在几个对象之间共享一个对象，以便几个对象都能看见对共享对象的修改，那么这个共享的
对象就应该是引用。

 */



/**
做法

   检查重构目标是否为不可变对象，或者是否可修改为不可变对象。

   用移除设值函数（331）逐一去掉所有设值函数。

   提供一个基于值的相等性判断函数，在其中使用值对象的字段。

   大多数编程语言都提供了可覆写的相等性判断函数。通常你还必须同时覆写生成散列码的函数。

 */









