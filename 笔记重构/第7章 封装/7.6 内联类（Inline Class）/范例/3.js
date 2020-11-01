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
    对于TrackingInformation类中所有为客户端调用的方法，我将施以相同的手法。这之后，我就可以
 将源类中的所有东西都搬移到Shipment类中去。我先对display方法应用内联函数（115）手法.

    再继续搬移“收货公司”（shipping company）字段。
 */
class Shipment {
    constructor(companyName,Number) {
        this._trackingInformation = new TrackingInformation(companyName,Number);
        this.shippingCompany = companyName;
        this.trackingNumber = Number;
    }
    get trackingInfo() {
        return `${this.shippingCompany}: ${this.trackingNumber}`;
    }
    get shippingCompany() {return this._shippingCompany;}
    set shippingCompany(arg) {this._shippingCompany = arg;}

    get trackingInformation() {
        return this._trackingInformation;
    }
    set trackingInformation(aTrackingInformation) {
        this._trackingInformation = aTrackingInformation;
    }
}

//调用方...
aShipment.shippingCompany = request.vendor;



/**
    我并未遵循搬移字段（207）的全部步骤，因为此处我只是改由目标类Shipment来引用shippingCompany，那些从源类
搬移引用至目标类的步骤在此并不需要。
    我会继续相同的手法，直到所有搬迁工作完成为止。那时，我就可以删除TrackingInformation类了。
 */



