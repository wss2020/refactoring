/**
    再次测试，现在应该有一些测试失败，因为原本有些代码会用到子类上的hasTalkback函数。
 现在我要修复这些失败的测试：在超类的函数中添加适当的分发逻辑，如果有代理对象存在就使用代理对象。这样，这一步重构就算完成了。
 * */
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

    //get hasTalkback() {
      //  return this._premiumDelegate.hasTalkback;
    // }

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


/**
    下一个要处理的是basePrice函数。
 */




