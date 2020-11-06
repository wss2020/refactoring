/**
    在修改调用方之前，我喜欢利用JavaScript的语言特性先应用引入断言（302），
 确保调用方一定会用到这个新参数。
*/
class Book {
    addReservation(customer) {
        this.zz_addReservation(customer, false);
    }

    zz_addReservation(customer, isPriority) {
        assert(isPriority === true || isPriority === false);
        this._reservations.push(customer);
    }
}

/**
    现在，如果我在修改调用方时出了错，没有提供新参数，这个断言会帮我抓到错误——以我过去的经验来看，
 比我更容易出错的程序员怕是不多。
    现在，我可以对源函数使用内联函数（115），使其调用者转而使用新函数。这样我可以每次只修改一个调用者。
    现在我就可以把新函数改回原来的名字了。一般而言，此时用简单做法就够了；但如果有必要，也可以再用一遍
 迁移式做法。
 */









































































