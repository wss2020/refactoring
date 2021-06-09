/**
 * 全部修改完成后，就可以在构造函数中去掉对name的支持，只使用title。
 * */
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
