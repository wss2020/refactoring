/**
     前面的基本重构手法只封装了对最外层数据的引用。很多时候这已经足够了。
 但也有很多时候，我需要把封装做得更深入，不仅控制对变量引用的修改，还要控制对变量内容的修改。

 这有两个办法可以做到。
    最简单的办法是禁止对数据结构内部的数值做任何修改。
    我最喜欢的一种做法是修改取值函数，使其返回该数据的一份副本。
 */

// defaultOwner.js...
let defaultOwnerData = {firstName: "Martin", lastName: "Fowler"};
export function defaultOwner() {
    return Object.assign({}, defaultOwnerData);
}
export function setDefaultOwner(arg) {
    defaultOwnerData = arg;
}

/**
    对于列表数据，我尤其常用这一招。
 如果我在取值函数中返回数据的一份副本，客户端可以随便修改它，但不会影响到共享的这份数据。
 但在使用副本的做法时，我必须格外小心：有些代码可能希望能修改共享的数据。若果真如此，我就
 只能依赖测试来发现问题了。

    另一种做法是阻止对数据的修改，比如通过封装记录（162）就能很好地实现这一效果。
 */






