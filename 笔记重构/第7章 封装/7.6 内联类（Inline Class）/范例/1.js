//下面这个类存储了一次物流运输（shipment）的若干跟踪信息（tracking information）。
class TrackingInformation {
    constructor(companyName,Number) {
        this.shippingCompany = companyName;
        this.trackingNumber = Number;
    }
    get shippingCompany(){return this._shippingCompany;}
    set shippingCompany(arg) {this._shippingCompany = arg;}

    get trackingNumber(){return this._trackingNumber;}
    set trackingNumber(arg) {this._trackingNumber = arg;}

    get display(){
        return `${this.shippingCompany}: ${this.trackingNumber}`;
    }
}


//它作为Shipment（物流）类的一部分被使用。
class Shipment {
    constructor(companyName,Number) {
        this._trackingInformation = new TrackingInformation(companyName,Number);
    }
    get trackingInfo() {
        return this._trackingInformation.display;
    }
    get trackingInformation() {
        return this._trackingInformation;
    }
    set trackingInformation(aTrackingInformation) {
        this._trackingInformation = aTrackingInformation;
    }
}

/**
    TrackingInformation类过去可能有很多光荣职责，但现在我觉得它已不再能肩负起它的责任，因此
我希望将它内联到Shipment类里。
    首先，我要寻找TrackingInformation类的方法有哪些调用点。
*/
//调用方...
aShipment.trackingInformation.shippingCompany = request.vendor;




/**
    我将开始将源类的类似函数全都搬移到Shipment里去，但我的做法与做搬移函数（198）时略微有些
 不同。这里，我先在Shipment类里创建一个委托方法， 并调整客户端代码，使其调用这个委托方法。
 */

