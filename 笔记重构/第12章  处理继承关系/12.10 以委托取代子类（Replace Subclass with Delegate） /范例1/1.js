
/**
 * 下面这个类用于处理演出（show）的预订（booking）。
    它有一个子类，专门用于预订高级（premium）票，这个子类要考虑各种附加服务（extra）。
 * */
class Booking {
    constructor(show, date) {
        this._show = show;
        this._date = date;
    }

    get hasTalkback() {
        return this._show.hasOwnProperty('talkback') && !this.isPeakDay;
    }
    get basePrice() {
        let result = this._show.price;
        if (this.isPeakDay) result += Math.round(result * 0.15);
        return result;
    }
}


/**
    PremiumBooking类在超类基础上做了好些改变。在这种“针对差异编程”（programming-by-difference）的风格中，
 子类常会覆写超类的方法，有时还会添加只对子类有意义的新方法。我不打算讨论所有差异点，只选几处有意思的案例来分析。

 先来看一处简单的覆写。常规票在演出结束后会有“对话创作者”环节（talkback），但只在非高峰日提供这项服务。
    PremiumBooking覆写了 hasTalkback 这个逻辑，任何一天都提供与创作者的对话。
    定价逻辑也是相似的覆写，不过略有不同：PremiumBooking调用了超类中的方法。
    最后一个例子是PremiumBooking提供了一个超类中没有的行为 hasDinner。
 */
class PremiumBooking extends Booking {
    constructor(show, date, extras) {
        super(show, date);
        this._extras = extras;
    }

    get hasTalkback() {
        return this._show.hasOwnProperty('talkback');
    }
    get basePrice() {
        return Math.round(super.basePrice + this._extras.premiumFee);
    }
    get hasDinner() {
        return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
    }

}


/**
    继承在这个例子中工作良好。即使不了解子类，我同样也可以理解超类的逻辑。子类只描述自己与超类的差异——既避免了重复，又清晰地表述了自己引入的差异。

    说真的，它也并非如此完美。超类的一些结构只在特定的子类存在时才有意义——有些函数的组织方式完全就是为了方便覆写特定类型的行为。所以，尽管大部分时
 候我可以修改超类而不必理解子类，但如果刻意不关注子类的存在，在修改超类时偶尔有可能会破坏子类。不过，如果这种“偶尔”发生得不太频繁，继承就还是划算的
 ——只要我有良好的测试，当子类被破坏时就能及时发现。

    那么，既然情况还算不坏，为什么我想用以委托取代子类来做出改变呢？因为继承只能使用一次，如果我有别的原因想使用继承，并且这个新的原因比“高级预订”
 更有必要，就需要换一种方式来处理高级预订。另外，我可能需要动态地把普通预订升级成高级预订，例如提供aBooking.bePremium()这样一个函数。有时我可以
 新建一个对象（就好像通过HTTP请求从服务器端加载全新的数据），从而避免“对象本身升级”的问题。但有时我需要修改数据本身的结构，而不重建整个数据结构。
 如果一个Booking对象被很多地方引用，也很难将其整个替换掉。此时，就有必要允许在“普通预订”和“高级预订”之间来回转换。

    当这样的需求积累到一定程度时，我就该使用以委托取代子类了。现在客户端直接调用两个类的构造函数来创建不同的预订。
 */

// 进行普通预订的客户端
let aBooking = new Booking(show,date);

//进行高级预订的客户端
let aBooking = new PremiumBooking(show, date, extras);




/**
 去除子类会改变对象创建的方式，所以我要先用以工厂函数取代构造函数（334）把构造函数封装起来。
 */
