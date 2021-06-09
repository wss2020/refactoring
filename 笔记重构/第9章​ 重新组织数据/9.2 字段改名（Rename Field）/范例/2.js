/**
 现在，记录结构已经被封装成类。在对字段改名时，有4个地方需要留意：取值函数、设值函数、构造函数以及内部数据结构。这听起来似乎是增加了重构的工作量，
 但现在我可以分别小步修改这4处，而不必一次修改所有地方，所以其实是降低了重构的难度。小步修改就意味着每一步出错的可能性大大减小，因此会省掉很多工作量——
 如果我从不犯错，小步前进不会节省工作量；但“从不犯错”这样的梦，我很久以前就已经不做了。

 由于已经把输入数据复制到内部数据结构中，现在我需要将这两个数据结构区分开，以便各自单独处理。我可以另外定义一个字段，修改构造函数和访问函数，令其使
 用新字段。
 */
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
