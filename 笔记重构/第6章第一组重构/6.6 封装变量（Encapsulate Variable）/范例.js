

// 下面这个全局变量中保存了一些有用的数据：
let defaultOwner = {firstName: "Martin", lastName: "Fowler"};


// 使用它的代码平淡无奇：
spaceship.owner = defaultOwner;



// 更新这段数据的代码是这样：//
defaultOwner = {firstName: "Rebecca", lastName: "Parsons"};





//1.首先我要定义读取和写入这段数据的函数，给它做个基础的封装。
function getDefaultOwner() {
    return defaultOwner;
}
function setDefaultOwner(arg) {
    defaultOwner = arg;
}
//2.然后就开始处理使用defaultOwner的代码。每看见一处引用该数据的代码，就将其改为调用取值函数。
spaceship.owner = getDefaultOwner();

//3.每看见一处给变量赋值的代码，就将其改为调用设值函数。
setDefaultOwner({firstName: "Rebecca", lastName: "Parsons"});

//4.每次替换之后，执行测试。
// 处理完所有使用该变量的代码之后，我就可以限制它的可见性。
// 这一步的用意有两个，一来是检查是否遗漏了变量的引用，二来可以保证以后的代码也不会直接访问该变量。
// 在JavaScript中，我可以把变量和访问函数搬移到单独一个文件中，并且只导出访问函数，这样就限制了变量的可见性。



//defaultOwner.js...
let defaultOwner = {firstName: "Martin", lastName: "Fowler"};
export function getDefaultOwner() {
    return defaultOwner;
}
export function setDefaultOwner(arg) {
    defaultOwner = arg;
}

/*
    如果条件不允许限制对变量的访问，可以将变量改名，然后再次执行测试，

    检查是否仍有代码在直接使用该变量。这阻止不了未来的代码直接访问变量，不过可以给变量起个有意义又难看的名字（例如__privateOnly_defaultOwner），
    提醒后来的客户端。

    我不喜欢给取值函数加上get前缀，所以我对这个函数改名。
 */

// defaultOwner.js...
let defaultOwnerData = {firstName: "Martin", lastName: "Fowler"};
export function getdefaultOwner() {
    return defaultOwnerData;
}
export function setDefaultOwner(arg) {
    defaultOwnerData = arg;
}


/*
    JavaScript有一种惯例：给取值函数和设值函数起同样的名字，根据有没有传入参数来区分。
    我把这种做法称为“重载取值/设值函数”（Overloaded Getter Setter）[mf-orgs]，并且我强烈反对这种做法。
    所以，虽然我不喜欢get前缀，但我会保留set前缀。
 */

/*
封装值
   前面介绍的基本重构手法对数据结构的引用做了封装，使我能控制对该数据结构的访问和重新赋值，但并不能控制对结构内部数据项的修改：
*/
const owner1 = defaultOwner();
assert.equal("Fowler", owner1.lastName, "when set");

const owner2 = defaultOwner();
owner2.lastName = "Parsons";
assert.equal("Parsons", owner1.lastName, "after change owner2"); // is this ok?

/*
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

/*
    对于列表数据，我尤其常用这一招。
    如果我在取值函数中返回数据的一份副本，客户端可以随便修改它，但不会影响到共享的这份数据。
    但在使用副本的做法时，我必须格外小心：有些代码可能希望能修改共享的数据。若果真如此，我就只能依赖测试来发现问题了。

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


/*
   现在，如果客户端调用defaultOwner函数获得“默认拥有人”数据、再尝试对其属性（即lastName和firstName）重新赋值，赋值不会产生任何效果。
   对于侦测或阻止修改数据结构内部的数据项，各种编程语言有不同的方式，所以我会根据当下使用的语言来选择具体的办法。
   “侦测和阻止修改数据结构内部的数据项”通常只是个临时处置。随后我可以去除这些修改逻辑，或者提供适当的修改函数。

   这些都处理完之后，我就可以修改取值函数，使其返回一份数据副本。
   到目前为止，我都在讨论“在取数据时返回一份副本”，其实设值函数也可以返回一份副本。
   这取决于数据从哪儿来，以及我是否需要保留对源数据的连接，以便知悉源数据的变化。
   如果不需要这样一条连接，那么设值函数返回一份副本就有好处：可以防止因为源数据发生变化而造成的意外事故。

   很多时候可能没必要复制一份数据，不过多一次复制对性能的影响通常也都可以忽略不计。但是，如果不做复制，风险则是未来可能会陷入漫长而困难的调试排错过程。

   请记住，前面提到的数据复制、类封装等措施，都只在数据记录结构中深入了一层。如果想走得更深入，就需要更多层级的复制或是封装。

   如你所见，数据封装很有价值，但往往并不简单。到底应该封装什么，以及如何封装，取决于数据被使用的方式，以及我想要修改数据的方式。
   不过，一言以蔽之，数据被使用得越广，就越是值得花精力给它一个体面的封装。

 */




















