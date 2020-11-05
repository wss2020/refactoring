//某些重构会使参数不再被需要，这是我最常用到以查询取代参数的场合。考虑下列代码。
class Order {
    get finalPrice() {
        const basePrice = this.quantity * this.itemPrice;
        let discountLevel;
        if (this.quantity > 100) discountLevel = 2;
        else discountLevel = 1;
        return this.discountedPrice(basePrice, discountLevel);
    }

    discountedPrice(basePrice, discountLevel) {
        switch (discountLevel) {
            case 1:
                return basePrice * 0.95;
            case 2:
                return basePrice * 0.9;
        }
    }
}


//在简化函数逻辑时，我总是热衷于使用以查询取代临时变量（178），于是就得到了如下代码。


