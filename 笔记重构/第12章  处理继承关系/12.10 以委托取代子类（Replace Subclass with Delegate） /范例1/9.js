/**
    下一个要处理的是basePrice函数。

    情况大致相同，但有一点儿小麻烦：子类中调用了超类中的同名函数（在这种“子类扩展超类行为”的用法中，这种情况很常见）。把子类的代码移到委托类时，
 需要继续调用超类的逻辑——但我不能直接调用this._host.basePrice，这会导致无穷递归，因为_host对象就是PremiumBooking对象自己。

    有两个办法来处理这个问题。一种办法是，可以用提炼函数（106）把“基本价格”的计算逻辑提炼出来，从而把分发逻辑与价格计算逻辑拆开。
 （剩下的操作就跟前面的例子一样了。）
 */
class Booking {
    constructor(show, date) {
        this._show = show;
        this._date = date;
    }

    get hasTalkback(){
        return (this._premiumDelegate)
            ? this._premiumDelegate.hasTalkback
            : this._show.hasOwnProperty('talkback') && !this.isPeakDay;
    }


    //get basePrice() {
    //    let result = this._show.price;
    //    if (this.isPeakDay) result += Math.round(result * 0.15);
    //     return result;
    // }
    get basePrice() {
        return (this._premiumDelegate)
            ? this._premiumDelegate.basePrice : this._privateBasePrice;
    }
    get _privateBasePrice() {
        let result = this._show.price;
        if (this.isPeakDay) result += Math.round(result * 0.15);
        return result;
    }

    _bePremium(extras) {
        this._premiumDelegate = new PremiumBookingDelegate(this, extras);
    }
}

class PremiumBooking extends Booking {
    constructor(show, date, extras) {
        super(show, date);
        this._extras = extras;
    }

    // get basePrice() {
    //     return Math.round(super.basePrice + this._extras.premiumFee);
    // }
    get basePrice() {
        return Math.round(this._host._privateBasePrice + this._extras.premiumFee);
    }



    get hasDinner() {
        return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
    }

}


class PremiumBookingDelegate{
    constructor(hostBooking, extras) {
        this._host = hostBooking;
        this._extras = extras;
    }
    get hasTalkback() {
        return this._host._show.hasOwnProperty('talkback');
    }
}
function createBooking(show, date) {
    return new Booking(show, date);
}
function createPremiumBooking(show, date, extras) {
    const result = new PremiumBooking (show, date, extras);
    result._bePremium(extras);
    return result;
}

// 进行普通预订的客户端
let aBooking = createBooking(show, date);

//进行高级预订的客户端
let aBooking = createPremiumBooking(show, date, extras);







