/**
 然后修改Scroll的构造函数，用传入的catalogID来查找对应的CatalogItem对象，并引用这个对象（而不再新建CatalogItem对象）。
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

class Scroll {
    constructor(id, title, tags, dateLastCleaned, catalogID, catalog) {
        this._id = id;
        this._catalogItem = catalog.get(catalogID);
        this._lastCleaned = dateLastCleaned;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._catalogItem.title;
    }

    hasTag(aString) {
        return this._catalogItem.hasTag(aString);
    }

    needsCleaning(targetDate) {
        const threshold = this.hasTag("revered") ? 700 : 1500;
        return this.daysSinceLastCleaning(targetDate) > threshold;
    }

    daysSinceLastCleaning(targetDate) {
        return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
    }
}

// 加载程序...
const scrolls = aDocument
    .map(record => new Scroll(record.id,
        record.catalogData.title,
        record.catalogData.tags,
        LocalDate.parse(record.lastCleaned),
        record.catalogData.id,
        catalog));


/**
 Scroll的构造函数已经不再需要传入title和tags这两个参数了，所以我用改变函数声明（124）把它们去掉。
 */
