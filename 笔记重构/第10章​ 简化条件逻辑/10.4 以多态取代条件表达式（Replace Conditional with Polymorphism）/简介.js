//修改前
function test() {
    switch (bird.type) {
        case 'EuropeanSwallow':
            return "average";
        case 'AfricanSwallow':
            return (bird.numberOfCoconuts > 2) ? "tired" : "average";
        case 'NorwegianBlueParrot':
            return (bird.voltage > 100) ? "scorched" : "beautiful";
        default:
            return "unknown";
    }
}


//重构后
class EuropeanSwallow {
    get plumage() {
        return "average";
    }
}
class AfricanSwallow {
    get plumage() {
        return (this.numberOfCoconuts > 2) ? "tired" : "average";
    }
}
class NorwegianBlueParrot {
    get plumage() {
        return (this.voltage > 100) ? "scorched" : "beautiful";
    }
}


/**
动机
   复杂的条件逻辑是编程中最难理解的东西之一，因此我一直在寻求给条件逻辑添加结构。
      很多时候，我发现可以将条件逻辑拆分到不同的场景（或者叫高阶用例），从而拆解复杂的条件逻辑。
      这种拆分有时用条件逻辑本身的结构就足以表达，但使用类和多态能把逻辑的拆分表述得更清晰。

   一个常见的场景是：我可以构造一组类型，每个类型处理各自的一种条件逻辑。
      例如，我会注意到，图书、音乐、食品的处理方式不同，这是因为它们分属不同类型的商品。
      最明显的征兆就是有好几个函数都有基于类型代码的switch语句。
       若果真如此，我就可以针对switch语句中的每种分支逻辑创建一个类，用多态来承载各个类型特有的行为，从而去除重复的分支逻辑。

   另一种情况是：有一个基础逻辑，在其上又有一些变体。
      基础逻辑可能是最常用的，也可能是最简单的。
      我可以把基础逻辑放进超类，这样我可以首先理解这部分逻辑，暂时不管各种变体，
       然后我可以把每种变体逻辑单独放进一个子类，其中的代码着重强调与基础逻辑的差异。

   多态是面向对象编程的关键特性之一。跟其他一切有用的特性一样，它也很容易被滥用。
      我曾经遇到有人争论说所有条件逻辑都应该用多态取代。
        我不赞同这种观点。我的大部分条件逻辑只用到了基本的条件语句——if/else和switch/case，
          并不需要劳师动众地引入多态。但如果发现如前所述的复杂条件逻辑，多态是改善这种情况的有力工具。
 */


/**
做法
   如果现有的类尚不具备多态行为，就用工厂函数创建之，令工厂函数返回恰当的对象实例。
       在调用方代码中使用工厂函数获得对象实例。  将带有条件逻辑的函数移到超类中。

   如果条件逻辑还未提炼至独立的函数，首先对其使用提炼函数（106）。

   任选一个子类，在其中建立一个函数，使之覆写超类中容纳条件表达式的那个函数。
      将与该子类相关的条件表达式分支复制到新函数中，并对它进行适当调整。

   重复上述过程，处理其他条件分支。

   在超类函数中保留默认情况的逻辑。或者，如果超类应该是抽象的，就把该函数声明为abstract，
      或在其中直接抛出异常，表明计算责任都在子类中。
 */






























