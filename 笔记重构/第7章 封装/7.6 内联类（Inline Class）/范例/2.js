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

/**
    我将开始将源类的类似函数全都搬移到Shipment里去，但我的做法与做搬移函数（198）时略微有些
 不同。这里，我先在Shipment类里创建一个委托方法， 并调整客户端代码，使其调用这个委托方法。
 */
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

    set shippingCompany(arg) {
        this._trackingInformation.shippingCompany = arg;
    }
}

//调用方...
aShipment.shippingCompany = request.vendor;


/**
    对于TrackingInformation类中所有为客户端调用的方法，我将施以相同的手法。这之后，我就可以
将源类中的所有东西都搬移到Shipment类中去。我先对display方法应用内联函数（115）手法
 */
