/**
    我希望把basePrice和discountFactor两个临时变量变成函数。
    先从basePrice开始，我先把它声明成const并运行测试。这可以很好地防止我遗漏了对变量的
 其他赋值点——对于这么个小函数是不太可能的，但当我处理更大的函数时就不一定了。
 */

class Order {
    constructor(quantity, item) {
        this._quantity = quantity;
        this._item = item;
    }
    get price() {
        const basePrice = this._quantity * this._item.price;
        let discountFactor = 0.98;
        if (basePrice > 1000) discountFactor -= 0.03;
        return basePrice * discountFactor;
    }
}

//然后我把赋值操作的右边提炼成一个取值函数。

