/**
    然后我会在新函数的声明中增加参数，同时修改旧函数中调用新函数的地方（也就是采用简单做法完成这一步）
*/
class Book {
    addReservation(customer) {
        this.zz_addReservation(customer, false);
    }

    zz_addReservation(customer, isPriority) {
        this._reservations.push(customer);
    }
}


/**
    在修改调用方之前，我喜欢利用JavaScript的语言特性先应用引入断言（302），
 确保调用方一定会用到这个新参数。
*/























































