/**
    对于列表数据，我尤其常用这一招。
 如果我在取值函数中返回数据的一份副本，客户端可以随便修改它，但不会影响到共享的这份数据。
 但在使用副本的做法时，我必须格外小心：有些代码望能修改共享可能希的数据。若果真如此，我就只能依赖测试来发现问题了。

    另一种做法是阻止对数据的修改，比如通过封装记录（162）就能很好地实现这一效果。
 */

let defaultOwnerData = {firstName: "Martin", lastName: "Fowler"};
export function defaultOwner() {
    return new Person(defaultOwnerData);
}
export function setDefaultOwner(arg) {
    defaultOwnerData = arg;
}
class Person {
    constructor(data) {
        this._lastName = data.lastName;
        this._firstName = data.firstName
    }

    get lastName() {
        return this._lastName;
    }

    get firstName() {
        return this._firstName;
    }
    // and so on for other properties
}


/**
    现在，如果客户端调用defaultOwner函数获得“默认拥有人”数据、再尝试对其属性（即lastName和firstName）
 重新赋值，赋值不会产生任何效果。
    对于侦测或阻止修改数据结构内部的数据项，各种编程语言有不同的方式，所以我会根据当下使用的语言来选择具体
 的办法。
 “侦测和阻止修改数据结构内部的数据项”通常只是个临时处置。随后我可以去除这些修改逻辑，或者提供适当的修改函数。

    这些都处理完之后，我就可以修改取值函数，使其返回一份数据副本。
    到目前为止，我都在讨论“在取数据时返回一份副本”，其实设值函数也可以返回一份副本。
    这取决于数据从哪儿来，以及我是否需要保留对源数据的连接，以便知悉源数据的变化。
    如果不需要这样一条连接，那么设值函数返回一份副本就有好处：可以防止因为源数据发生变化而造成的意外事故。

    很多时候可能没必要复制一份数据，不过多一次复制对性能的影响通常也都可以忽略不计。但是，如果不做复制，风险
 则是未来可能会陷入漫长而困难的调试排错过程。

    请记住，前面提到的数据复制、类封装等措施，都只在数据记录结构中深入了一层。如果想走得更深入，就需要更多层
 级的复制或是封装。

    如你所见，数据封装很有价值，但往往并不简单。到底应该封装什么，以及如何封装，取决于数据被使用的方式，以及
 我想要修改数据的方式。
    不过，一言以蔽之，数据被使用得越广，就越是值得花精力给它一个体面的封装。
 */



















