/**
 我首先在Scroll类中创建一个属性，令其指向一个新建的CatalogItem实例。
 */

class CatalogItem {
    constructor(id, title, tags) {
        this._id = id;
        this._title = title;
        this._tags = tags;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    hasTag(arg) {
        return this._tags.includes(arg);
    }
}


class Scroll extends CatalogItem {
    constructor(id, title, tags, dateLastCleaned) {
        super(id, title, tags);
        this._lastCleaned = dateLastCleaned;
        this._catalogItem = new CatalogItem(id, title, tags);
    }

    needsCleaning(targetDate) {
        const threshold = this.hasTag("revered") ? 700 : 1500;
        return this.daysSinceLastCleaning(targetDate) > threshold;
    }

    daysSinceLastCleaning(targetDate) {
        return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
    }
}

/**
 然后对于子类中用到所有属于超类的函数，我要逐一为它们创建转发函数。
 */





