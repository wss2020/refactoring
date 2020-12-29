// 反向重构：字段下移（361）

//重构前  Java
class Employee {}
class Salesman extends Employee {
    private String name;
}

class Engineer extends Employee {
    private String name;
}



//重构后
class Employee {
    protected String name;
}
class Salesman extends Employee {}
class Engineer extends Employee {}


/**
 动机
     如果各子类是分别开发的，或者是在重构过程中组合起来的，你常会发现它们拥有重复特性，特别是字段更容易重复。
     这样的字段有时拥有近似的名字，但也并非绝对如此。判断若干字段是否重复，唯一的办法就是观察函数如何使用它们。
     如果它们被使用的方式很相似，我就可以将它们提升到超类中去。

     本项重构可从两方面减少重复：首先它去除了重复的数据声明；其次它使我可以将使用该字段的行为从子类移至超类，
     从而去除重复的行为。

     许多动态语言不需要在类定义中定义字段，相反，字段是在第一次被赋值的同时完成声明。在这种情况下，字段上移
     基本上是应用构造函数本体上移（355）后的必然结果。
 */



 /**
  做法
    针对待提升之字段，检查它们的所有使用点，确认它们以同样的方式被使用。
    如果这些字段的名称不同，先使用变量改名（137）为它们取个相同的名字。
    在超类中新建一个字段。
        新字段需要对所有子类可见（在大多数语言中protected权限便已足够）。
    移除子类中的字段。
    测试。
 */












