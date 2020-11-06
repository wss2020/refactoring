/**
  现在我需要支持“高优先级预订”，因此我要给addReservation额外添加一个参数，用于标记这次预订应该进入普通队列还是优先队列。
  如果能很容易地找到并修改所有调用方，我可以直接修改；但如果不行，我仍然可以采用迁移式做法，
  下面是详细的过程。
     首先，我用提炼函数（106）把addReservation的函数体提炼出来，放进一个新函数。
     这个新函数最终会叫addReservation，但新旧两个函数不能同时占用这个名字，所以我会先给新函数起一个容易搜索的临时名字。
 */
class Book {
    addReservation(customer) {
        this.zz_addReservation(customer);
    }

    zz_addReservation(customer) {
        this._reservations.push(customer);
    }
}


/**
    然后我会在新函数的声明中增加参数，同时修改旧函数中调用新函数的地方（也就是采用简单做法完成这一步）
*/






























































