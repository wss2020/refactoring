/**
    在JavaScript中，如果尝试访问一个没有定义的属性，就会得到undefined，所以我在这个函数中也这样做。（尽管我直觉认为应该抛出错误，我所熟悉的
 其他面向对象动态语言就是这样做的。）

    所有的行为都从子类中搬移出去之后，我就可以修改工厂函数，令其返回超类的实例。再次运行测试，确保一切都运转良好，然后我就可以删除子类。
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

    get basePrice() {
        let result = this._show.price;
        if (this.isPeakDay)
            result += Math.round(result * 0.15); return (this._premiumDelegate)
            ? this._premiumDelegate.extendBasePrice(result)
            : result;
    }

    get hasDinner() {
        return (this._premiumDelegate)
            ? this._premiumDelegate.hasDinner
            : undefined;
    }

    _bePremium(extras) {
        this._premiumDelegate = new PremiumBookingDelegate(this, extras);
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
    get hasDinner() {
        return this._extras.hasOwnProperty('dinner') && !this._host.isPeakDay;
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
    只看这个重构本身，我并不觉得代码质量得到了提升。继承原本很好地应对了需求场景，换成委托以后，我增加了分发逻辑、双向引用，复杂度上升不少。
 不过这个重构可能还是值得的，因为现在“是否高级预订”这个状态可以改变了，并且我也可以用继承来达成其他目的了。如果有这些需求的话，去除原有的继
 承关系带来的损失可能还是划算的。
 */




