// 反向重构：提炼类（182）

//重构前
class Person {
    get officeAreaCode() {return this._telephoneNumber.areaCode;}
    get officeNumber(){return this._telephoneNumber.number;}
}
class TelephoneNumber {
    get areaCode() {return this._areaCode;}
    get number() {return this._number;}
}


//重构后
class Person {
    get officeAreaCode() { return this._officeAreaCode; }
    get officeNumber() { return this._officeNumber; }
}


/**
 动机
    内联类正好与提炼类（182）相反。如果一个类不再承担足够责任，不再有单独存在的理由（这通常是因为
 此前的重构动作移走了这个类的责任），我就会挑选这一“萎缩类”的最频繁用户（也是一个类），以本手法
 将“萎缩类”塞进另一个类中。

    应用这个手法的另一个场景是，我手头有两个类，想重新安排它们肩负的职责，并让它们产生关联。这时我
 发现先用本手法将它们内联成一个类再用提炼类（182）去分离其职责会更加简单。这是重新组织代码时常用的
 做法：有时把相关元素一口气搬移到位更简单，但有时先用内联手法合并各自的上下文，再使用提炼手法再次分
 离它们会更合适。
 **/

 /**
 做法
    对于待内联类（源类）中的所有public函数，在目标类上创建一个对应的函数，新创建的所有函数应该
  直接委托至源类。
    修改源类public方法的所有引用点，令它们调用目标类对应的委托方法。每次更改后运行测试。
    将源类中的函数与数据全部搬移到目标类，每次修改之后进行测试，直到源类变成空壳为止。
    删除源类，为它举行一个简单的“丧礼”
 **/


 


