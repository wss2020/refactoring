let _repositoryData;
export function initialize() {
    _repositoryData = {};
    _repositoryData.customers = new Map();
}
export function registerCustomer(id) {
    if (!_repositoryData.customers.has(id)) _repositoryData.customers.set(id, new Customer(id));
    return findCustomer(id);
}
export function findCustomer(id) {
    return _repositoryData.customers.get(id);
}


/**
 仓库对象允许根据ID注册顾客，并且对于一个ID只会创建一个Customer对象。有了仓库对象，我就可以修改Order对象的构造函数来使用它。
 在使用本重构手法时，可能仓库对象已经存在了，那么就可以直接使用它。
 下一步是要弄清楚，Order的构造函数如何获得正确的Customer对象。在这个例子里，这一步很简单，因为输入数据流中已经包含了顾客的ID。
 */
class Order {
    constructor(data) {
        this._number = data.number;
        this._customer = registerCustomer(data.customer); // load other data
    }
    get customer() {
        return this._customer;
    }
}

/**
   现在，如果我在一条订单中修改了顾客信息，就会同步反映在该顾客拥有的所有订单中。

   在这个例子里，我在第一个引用该顾客信息的Order对象中新建了Customer对象。另一个常见的做法是：首先获取一份包含所有Customer对象的列表，将其填入仓
库对象，然后在读取Order对象时关联到对应的Customer对象。如果这样做，那么Order对象包含的顾客ID必须指向一个仓库中已有的Customer对象，否则就表示程序
中有错误。

   上面的代码还有一个问题：构造函数与一个全局的仓库对象耦合。
   全局对象必须小心对待：它们就像强力的药物，少用一点儿大有益处，用过量就是毒药。如果想解决这个问题，可以将仓库对象作为参数传递给构造函数。
 */
