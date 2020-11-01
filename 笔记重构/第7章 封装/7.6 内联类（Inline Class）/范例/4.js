/**
    我并未遵循搬移字段（207）的全部步骤，因为此处我只是改由目标类Shipment来引用
 shippingCompany，那些从源类搬移引用至目标类的步骤在此并不需要。
 我会继续相同的手法，直到所有搬迁工作完成为止。那时，我就可以删除TrackingInformation类了。
 */
class Shipment {
    constructor(companyName, Number) {
        // this._trackingInformation = new TrackingInformation(companyName, Number);
        this.shippingCompany = companyName;
        this.trackingNumber = Number;
    }

    get trackingInfo() {
        return `${this.shippingCompany}: ${this.trackingNumber}`;
    }
    get shippingCompany() {
        return this._shippingCompany;
    }
    set shippingCompany(arg) {
        this._shippingCompany = arg;
    }
    get trackingNumber() {
        return this._trackingNumber;
    }
    set trackingNumber(arg) {
        this._trackingNumber = arg;
    }
}

//调用方...
aShipment.shippingCompany = request.vendor;




