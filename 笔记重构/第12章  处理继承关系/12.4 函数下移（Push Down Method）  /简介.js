// 反向重构：函数上移（350）

// 重构前
class Employee {
    get quota(){}
}
class Engineer extends Employee {}
class Salesman extends Employee {}


//重构后
class Employee1 {}
class Engineer1 extends Employee1 {}
class Salesman1 extends Employee1 {
    get quota(){}
}


/**
 动机
    如果超类中的某个函数只与一个（或少数几个）子类有关，那么最好将其从超类中挪走，放到真正关心它的子类中去。
 这项重构手法只有在超类明确知道哪些子类需要这个函数时适用。如果超类不知晓这个信息，那我就得用以多态取代条件
 表达式（272），只留些共用的行为在超类。
 */



/**
 做法
    将超类中的函数本体复制到每一个需要此函数的子类中。
    删除超类中的函数。
    测试。
    将该函数从所有不需要它的那些子类中删除。
    测试。
 */
