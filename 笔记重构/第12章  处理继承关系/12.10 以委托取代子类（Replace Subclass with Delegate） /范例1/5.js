/**
    结构设置好了，现在该动手搬移行为了。我首先考虑hasTalkback函数简单的覆写逻辑。现在的代码如下。  和上一个一样，代码没有变化。
 */
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

    _bePremium(extras) {
        this._premiumDelegate = new PremiumBookingDelegate(this, extras);
    }
}

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


class PremiumBookingDelegate{
    constructor(hostBooking, extras) {
        this._host = hostBooking;
        this._extras = extras;
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


/**
    我用搬移函数（198）把子类中的函数搬到委托类中。为了让它适应新家，原本访问超类中数据的代码，现在要改为调用_host对象
 */




