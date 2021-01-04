
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
    然后新建一个委托类。这个类的构造函数参数有两部分：首先是指向Booking对象的反向引用，随后是只有子类才需要的那些数据。我需要传入反向引用，
 是因为子类的几个函数需要访问超类中的数据。有继承关系的时候，访问这些数据很容易；而在委托关系中，就得通过反向引用来访问。
 */
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
    return new PremiumBooking (show, date, extras);
}

// 进行普通预订的客户端
let aBooking = createBooking(show, date);

//进行高级预订的客户端
let aBooking = createPremiumBooking(show, date, extras);


/** 现在可以把新建的委托对象与Booking对象关联起来。在“创建高级预订”的工厂函数中修改即可。 */



