/**
 最后一个例子是一个只存在于子类中的函数。

 先把 hasDinner 从子类 PremiumBooking 移动到委托类 PremiumBookingDelegate。
 然后在Booking类中添加分发逻辑 hasDinner。
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

    get basePrice() {
        return (this._premiumDelegate) ? this._premiumDelegate.basePrice : this._privateBasePrice;
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

    // get hasDinner() {
    //     return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
    // }

}


class PremiumBookingDelegate {
    constructor(hostBooking, extras) {
        this._host = hostBooking;
        this._extras = extras;
    }

    get hasTalkback() {
        return this._host._show.hasOwnProperty('talkback');
    }

    get hasDinner() {
        return this._extras.hasOwnProperty('dinner') && !this._host.isPeakDay;
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
 在JavaScript中，如果尝试访问一个没有定义的属性，就会得到undefined，所以我在这个函数中也这样做。（尽管我直觉认为应该抛出错误，我所熟悉的
 其他面向对象动态语言就是这样做的。）

 所有的行为都从子类中搬移出去之后，我就可以修改工厂函数，令其返回超类的实例。再次运行测试，确保一切都运转良好，然后我就可以删除子类。
 */




