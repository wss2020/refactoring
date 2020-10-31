// 下面是一个简单的例子：折扣。顾客（customer）会获得一个折扣率（discount rate），可以用于所有其购买的商品。


class Customer{
    applyDiscount(aNumber) {
        return (this.discountRate) ? aNumber - (this.discountRate * aNumber) : aNumber;
    }
}

/*
   这里有一个假设：折扣率永远是正数。我可以用断言明确标示出这个假设。
      但在一个三元表达式中没办法很简单地插入断言，所以我首先要把这个表达式转换成if-else的形式。
*/
class Customer{
    applyDiscount(aNumber) {
        if (!this.discountRate) return aNumber;
        else return aNumber - (this.discountRate * aNumber);
    }
}

// 现在我就可以轻松地加入断言了。
class Customer{
    applyDiscount(aNumber) {
        if (!this.discountRate) return aNumber;
        else {
            assert(this.discountRate >= 0);
            return aNumber - (this.discountRate * aNumber);
        }
    }
}

/*
   对这个例子而言，我更愿意把断言放在设值函数上。
       如果在applyDiscount函数处发生断言失败，我还得先费力搞清楚非法的折扣率值起初是从哪儿放进去的。
*/
class Customer {
    set discountRate(aNumber) {
        assert(null === aNumber || aNumber >= 0);
        this._discountRate = aNumber;
    }
}

/*
  真正引起错误的源头有可能很难发现——也许是输入数据中误写了一个减号，也许是某处代码做数据转换时犯了错误。像这样的断言对于发现错误源头特别有帮助。

  注意，不要滥用断言。我不会使用断言来检查所有“我认为应该为真”的条件，只用来检查“必须为真”的条件。
    滥用断言可能会造成代码重复，尤其是在处理上面这样的条件逻辑时。
    所以我发现，很有必要去掉条件逻辑中的重复，通常可以借助提炼函数（106）手法。

  我只用断言预防程序员的错误。如果要从某个外部数据源读取数据，那么所有对输入值的检查都应该是程序的一等公民，
     而不能用断言实现——除非我对这个外部数据源有绝对的信心。
     断言是帮助我们跟踪bug的最后一招，所以，或许听来讽刺，只有当我认为断言绝对不会失败的时候，我才会使用断言。

 */
































