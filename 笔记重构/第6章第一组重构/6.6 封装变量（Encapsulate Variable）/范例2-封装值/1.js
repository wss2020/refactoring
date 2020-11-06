/**
    前面介绍的基本重构手法对数据结构的引用做了封装，使我能控制对该数据结构的访问和重新赋值，但并不能控制
 对结构内部数据项的修改：
 */
const owner1 = defaultOwner();
assert.equal("Fowler", owner1.lastName, "when set");

const owner2 = defaultOwner();
owner2.lastName = "Parsons";
assert.equal("Parsons", owner1.lastName, "after change owner2"); // is this ok?


/**
     前面的基本重构手法只封装了对最外层数据的引用。很多时候这已经足够了。
 但也有很多时候，我需要把封装做得更深入，不仅控制对变量引用的修改，还要控制对变量内容的修改。

 这有两个办法可以做到。
    最简单的办法是禁止对数据结构内部的数值做任何修改。
    我最喜欢的一种做法是修改取值函数，使其返回该数据的一份副本。
 */








