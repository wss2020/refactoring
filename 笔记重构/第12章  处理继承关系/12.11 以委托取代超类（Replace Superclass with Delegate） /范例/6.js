/**
 将值对象改为引用对象（256）的第一步是要找到或者创建一个仓库对象（repository）。我发现有一个仓库对象可以很容易地导入加载程序中，这个仓库对象
 负责提供CatalogItem对象，并用ID作为索引。我的下一项任务就是要想办法把这个ID值放进Scroll对象的构造函数。还好，输入数据中有这个值，不过之前一直
 被无视了，因为在使用继承的时候用不着。把这些信息都理清楚，我就可以运用改变函数声明（124），把整个目录对象以及目录项的ID都作为参数传给Scroll的构造
 函数。
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
        this._catalogItem = new CatalogItem(null, title, tags);
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
 然后修改Scroll的构造函数，用传入的catalogID来查找对应的CatalogItem对象，并引用这个对象（而不再新建CatalogItem对象）。
 */

