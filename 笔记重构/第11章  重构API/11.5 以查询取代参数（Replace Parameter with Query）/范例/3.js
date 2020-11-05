/**
    到这一步，已经不需要再把discountLevel的计算结果传给discountedPrice 了，后者可以自己
 调用discountLevel函数，不会增加任何难度。因此，我把discountedPrice函数中用到这个参数的
 地方全都改为直接调用discountLevel函数。
 */
class Order {
    get finalPrice() {
        const basePrice = this.quantity * this.itemPrice;
        return this.discountedPrice(basePrice, this.discountLevel);
    }

    get discountLevel() {
        return (this.quantity > 100) ? 2 : 1;
    }

    discountedPrice(basePrice, discountLevel) {
        switch (this.discountLevel) {
            case 1:
                return basePrice * 0.95;
            case 2:
                return basePrice * 0.9;
        }
    }
}


//然后用改变函数声明（124）手法移除该参数。

