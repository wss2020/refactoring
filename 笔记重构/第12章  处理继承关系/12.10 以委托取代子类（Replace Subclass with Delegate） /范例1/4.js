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

    /**
     _bePremium函数以下划线开头，表示这个函数不应该被当作Booking类的公共接口。当然，如果最终我们希望允许普通预订转换成高级预订，
     这个函数也可以成为公共接口
     */
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


/**
 现在可以把新建的委托对象与Booking对象关联起来。在“创建高级预订”的工厂函数中修改即可。
 或者我也可以在Booking类的构造函数中构建它与委托对象之间的联系。为此，我需要以某种方式告诉构造函数“这是一个高级预订”：可以通过一个额外的参数，
 也可以直接通过extras参数来表示（如果我能确定这个参数只有高级预订才会用到的话）。不过我还是更愿意在工厂函数中构建这层联系，因为这样可以把意图表达
 得更明确。
 */
class PremiumBookingDelegate {
    constructor(hostBooking, extras) {
        this._host = hostBooking;
        this._extras = extras;
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
 结构设置好了，现在该动手搬移行为了。我首先考虑hasTalkback函数简单的覆写逻辑。现在的代码如下。
 */


