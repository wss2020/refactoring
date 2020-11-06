/**
    大多数重构手法只用于修改我有权修改的代码，但这个重构手法同样适用于已发布API——使用这些API的代码我无权修改。
 以上面的代码为例，创建出circumference函数之后，我就可以暂停重构，并（如果可以的话）将circum函数标记为deprecated。
 然后我就耐心等待客户端改用circumference函数，等他们都改完了，我再删除circum函数。
 即便永远也抵达不了“删除circum函数”这个快乐的终点，至少新代码有了一个更好的名字。
 */


/**
    想象一个管理图书馆的软件，其中有代表“图书”的Book类，它可以接受顾客（customer）的预订（reservation）：
*/
class Book{
    addReservation(customer) {
        this._reservations.push(customer);
    }
}

/**
  现在我需要支持“高优先级预订”，因此我要给addReservation额外添加一个参数，用于标记这次预订应该进入普通队列还是优先队列。
  如果能很容易地找到并修改所有调用方，我可以直接修改；但如果不行，我仍然可以采用迁移式做法，
  下面是详细的过程。
     首先，我用提炼函数（106）把addReservation的函数体提炼出来，放进一个新函数。
     这个新函数最终会叫addReservation，但新旧两个函数不能同时占用这个名字，所以我会先给新函数起一个容易搜索的临时名字。
 */




















































