//重构前
class Price_ {
    constructor(data) {
        this._quantity = data._quantity;
        this._itemPrice = data._itemPrice
    }

    basePriceResult() {
        const basePrice = this._quantity * this._itemPrice;
        if (basePrice > 1000) return basePrice * 0.95;
        else return basePrice * 0.98;
    }
}


//重构后
class Price {
    constructor(data) {
        this._quantity = data._quantity;
        this._itemPrice = data._itemPrice
    }

    get basePrice() {
        return this._quantity * this._itemPrice;
    }

    basePriceResult() {
        if (this.basePrice > 1000) return this.basePrice * 0.95;
        else return this.basePrice * 0.98;
    }
}

/**
 动机
 临时变量的一个作用是保存某段代码的返回值，以便在函数的后面部分使用它。临时变量允许我引用之前的值，既能解释它的含义，还能避免对代码
 进行重复计算。但尽管使用变量很方便，很多时候还是值得更进一步，将它们抽取成函数。

 如果我正在分解一个冗长的函数，那么将变量抽取到函数里能使函数的分解过程更简单，因为我就不再需要将变量作为参数传递给提炼出来的小函数。
 将变量的计算逻辑放到函数中，也有助于在提炼得到的函数与原函数之间设立清晰的边界，这能帮我发现并避免难缠的依赖及副作用。

 改用函数还让我避免了在多个函数中重复编写计算逻辑。每当我在不同的地方看见同一段变量的计算逻辑，我就会想方设法将它们挪到同一个函数里。

 这项重构手法在类中施展效果最好，因为类为待提炼函数提供了一个共同的上下文。如果不是在类中，我很可能会在顶层函数中拥有过多参数，这将冲
 淡提炼函数所能带来的诸多好处。使用嵌套的小函数可以避免这个问题，但又限制了我在相关函数间分享逻辑的能力。

 以查询取代临时变量（178）手法只适用于处理某些类型的临时变量：那些只被计算一次且之后不再被修改的变量。最简单的情况是，这个临时变量只
 被赋值一次，但在更复杂的代码片段里，变量也可能被多次赋值——此时应该将这些计算代码一并提炼到查询函数中。并且，待提炼的逻辑多次计算同样的变
 量时， 应该能得到相同的结果。因此，对于那些做快照用途的临时变量（从变量名往往可见端倪，比如oldAddress这样的名字），就不能使用本手法。
 **/


/**
 做法
 检查变量在使用前是否已经完全计算完毕，检查计算它的那段代码是否每次都能得到一样的值。
 如果变量目前不是只读的，但是可以改造成只读变量，那就先改造它。测试。
 将为变量赋值的代码段提炼成函数。
 注意：如果变量和函数不能使用同样的名字，那么先为函数取个临时的名字。确保待提炼函数没有副作用。若有，先应用将查询函数和修改函数分离
 （306）手法隔离副作用。
 测试。
 应用内联变量（123）手法移除临时变量。
 **/

