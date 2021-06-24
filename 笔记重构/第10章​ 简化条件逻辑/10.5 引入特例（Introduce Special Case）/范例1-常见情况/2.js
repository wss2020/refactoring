/*
    1.我首先给Customer添加一个函数，用于指示“这个顾客是否未知”。
*/
class Customer {
  get isUnknown() {
    return false;
  }
}


/*2.然后我给“未知的顾客”专门创建一个类。*/
class UnknownCustomer {
  get isUnknown() {
    return true;
  }
}


/*
注意，我没有把UnknownCustomer类声明为Customer的子类。在其他编程语言（尤其是静态类型的编程语言）中，我会需要继承关系。
  但JavaScript是一种动态类型语言，按照它的子类化规则，这里不声明继承关系反而更好。
*/