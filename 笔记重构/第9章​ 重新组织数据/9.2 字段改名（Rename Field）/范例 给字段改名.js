//我们从一个常量开始。
const organization = {name: "Acme Gooseberries", country: "GB"};

//我想把name改名为title。这个对象被很多地方使用，有些代码会更新name字段。所以我首先要用封装记录（162）把这个记录封装起来。
class Organization {
    constructor(data) {
        this._name = data.name;
        this._country = data.country;
    }
    get name() {
        return this._name;
    }
    set name(aString) {
        this._name = aString;
    }
    get country() {
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}

const organization = new Organization({name: "Acme Gooseberries", country: "GB"});

/*
   现在，记录结构已经被封装成类。在对字段改名时，有4个地方需要留意：取值函数、设值函数、构造函数以及内部数据结构。这听起来似乎是增加了重构的工作量，
但现在我可以分别小步修改这4处，而不必一次修改所有地方，所以其实是降低了重构的难度。小步修改就意味着每一步出错的可能性大大减小，因此会省掉很多工作量——
如果我从不犯错，小步前进不会节省工作量；但“从不犯错”这样的梦，我很久以前就已经不做了。

   由于已经把输入数据复制到内部数据结构中，现在我需要将这两个数据结构区分开，以便各自单独处理。我可以另外定义一个字段，修改构造函数和访问函数，令其使
用新字段。
 */
//class Organization...
class Organization {
    constructor(data) {
        this._title = data.name;
        this._country = data.country;
    }
    get name() {
        return this._title;
    }
    set name(aString) {
        this._title = aString;
    }
    get country() {
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}
//接下来我就可以在构造函数中使用title字段。
//class Organization...
class Organization {
    constructor(data) {
        this._title = (data.title !== undefined) ? data.title : data.name;
        this._country = data.country;
    }
    get name() {
        return this._title;
    }
    set name(aString) {
        this._title = aString;
    }
    get country() {
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}

//现在，构造函数的调用者既可以使用name也可以使用title（后者的优先级更高）。我会逐一查看所有调用构造函数的地方，将它们改为使用新名字。
const organization = new Organization({title: "Acme Gooseberries", country: "GB"});

//全部修改完成后，就可以在构造函数中去掉对name的支持，只使用title。
//class Organization...
class Organization {
    constructor(data) {
        this._title = data.title;
        this._country = data.country;
    }
    get name() {
        return this._title;
    }
    set name(aString) {
        this._title = aString;
    }
    get country() {
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}

//现在构造函数和内部数据结构都已经在使用新名字了，接下来我就可以给访问函数改名。这一步很简单，只要对每个访问函数运用函数改名（124）就行了。
//class Organization...
class Organization {
    constructor(data) {
        this._title = data.title;
        this._country = data.country;
    }
    get title() {
        return this._title;
    }
    set title(aString) {
        this._title = aString;
    }
    get country() {
        return this._country;
    }
    set country(aCountryCode) {
        this._country = aCountryCode;
    }
}

/*
   上面展示的重构过程，是本重构手法最重量级的做法，只有对广泛使用的数据结构才用得上。如果该数据结构只在较小的范围（例如单个函数）中用到，我可能可以一
步到位地完成所有改名动作，不需要提前做封装。何时需要用上全套重量级做法，这由你自己判断——如果在重构过程中破坏了测试，我通常会视之为一个信号，说明我需要
改用更渐进的方式来重构。

   有些编程语言允许将数据结构声明为不可变。在这种情况下，我可以把旧字段的值复制到新名字下，逐一修改使用方代码，然后删除旧字段。对于可变的数据结构，重
复数据会招致灾难；而不可变的数据结构则没有这些麻烦。这也是大家愿意使用不可变数据的原因
 */
















