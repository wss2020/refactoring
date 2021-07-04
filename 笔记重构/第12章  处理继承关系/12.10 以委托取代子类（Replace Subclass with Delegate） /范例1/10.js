/**
 另一种办法是，可以重新定义委托对象中的函数，使其成为基础函数的扩展。
 */
class Booking {
    constructor(show, date) {
        this._show = show;
        this._date = date;
    }

    get hasTalkback() {
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
        let result = this._show.price;
        if (this.isPeakDay) result += Math.round(result * 0.15);
        return (this._premiumDelegate) ? this._premiumDelegate.extendBasePrice(result) : result;
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

    get hasDinner() {
        return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
    }

}


class PremiumBookingDelegate {
    constructor(hostBooking, extras) {
        this._host = hostBooking;
        this._extras = extras;
    }

    get hasTalkback() {
        return this._host._show.hasOwnProperty('talkback');
    }

    extendBasePrice(base) {
        return Math.round(base + this._extras.premiumFee);
    }
}

function createBooking(show, date) {
    return new Booking(show, date);
}

function createPremiumBooking(show, date, extras) {
    const result = new PremiumBooking(show, date, extras);
    result._bePremium(extras);
    return result;
}

// 进行普通预订的客户端
let aBooking = createBooking(show, date);

//进行高级预订的客户端
let aBooking = createPremiumBooking(show, date, extras);


/**
 两种办法都可行，我更偏爱后者一点儿，因为需要的代码较少。最后一个例子是一个只存在于子类中的函数。
 */



