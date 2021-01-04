
/**
    Scroll的构造函数已经不再需要传入title和tags这两个参数了，所以我用改变函数声明（124）把它们去掉。
 */

class CatalogItem{
    constructor(id, title, tags) {
        this._id = id;
        this._title = title; this._tags = tags;
    }

    get id() {return this._id;}
    get title() {return this._title;}
    hasTag(arg) {return this._tags.includes(arg);}
}

class Scroll{
    constructor(id, dateLastCleaned, catalogID, catalog) {
        this._id = id;
        this._catalogItem = catalog.get(catalogID);
        this._lastCleaned = dateLastCleaned;
    }
    get id() {return this._id;}
    get title() {return this._catalogItem.title;}
    hasTag(aString) {return this._catalogItem.hasTag(aString);}

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
                        LocalDate.parse(record.lastCleaned),
                        record.catalogData.id,
                        catalog));




