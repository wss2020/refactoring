// 反向重构：字段上移（353）

// 重构前
class Employee {
    private quota: string;
}
class Engineer extends Employee {}
class Salesman extends Employee {}


// 重构后
class Employee1 {}
class Engineer1 extends Employee1 {}
class Salesman1 extends Employee1 {
    protected quota: string;
}


/**
    动机
    如果某个字段只被一个子类（或者一小部分子类）用到，就将其搬移到需要该字段的子类中。
 */


/**
    做法
    在所有需要该字段的子类中声明该字段。
    将该字段从超类中移除。
    测试。
    将该字段从所有不需要它的那些子类中删掉。
    测试。
 */











