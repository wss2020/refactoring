/*
     大多数重构手法只用于修改我有权修改的代码，但这个重构手法同样适用于已发布API——使用这些API的代码我无权修改。
  以上面的代码为例，创建出circumference函数之后，我就可以暂停重构，并（如果可以的话）将circum函数标记为deprecated。
  然后我就耐心等待客户端改用circumference函数，等他们都改完了，我再删除circum函数。
  即便永远也抵达不了“删除circum函数”这个快乐的终点，至少新代码有了一个更好的名字。
 */



//想象一个管理图书馆的软件，其中有代表“图书”的Book类，它可以接受顾客（customer）的预订（reservation）：
class Book{
    addReservation(customer) {
        this._reservations.push(customer);
    }
}

/*
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

//然后我会在新函数的声明中增加参数，同时修改旧函数中调用新函数的地方（也就是采用简单做法完成这一步）
class Book {
    addReservation(customer) {
        this.zz_addReservation(customer, false);
    }

    zz_addReservation(customer, isPriority) {
        this._reservations.push(customer);
    }
}


//在修改调用方之前，我喜欢利用JavaScript的语言特性先应用引入断言（302），确保调用方一定会用到这个新参数。
class Book {
    zz_addReservation(customer, isPriority) {
        assert(isPriority === true || isPriority === false);
        this._reservations.push(customer);
    }
}

/*
现在，如果我在修改调用方时出了错，没有提供新参数，这个断言会帮我抓到错误——以我过去的经验来看，比我更容易出错的程序员怕是不多。

现在，我可以对源函数使用内联函数（115），使其调用者转而使用新函数。这样我可以每次只修改一个调用者。

现在我就可以把新函数改回原来的名字了。一般而言，此时用简单做法就够了；但如果有必要，也可以再用一遍迁移式做法。


 */









































































