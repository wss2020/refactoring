/**
 我最近给一个古城里存放上古卷轴（scroll）的图书馆做了咨询。他们给卷轴的信息编制了一份目录（catalog），每份卷轴都有一个ID号，
 并记录了卷轴的标题（title）和一系列标签（tag）。
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

/**
 这些古老的卷轴需要日常清扫，因此代表卷轴的Scroll类继承了代表目录项的CatalogItem类，并扩展出与“需要清扫”相关的数据。
 */
class Scroll extends CatalogItem {
    constructor(id, title, tags, dateLastCleaned) {
        super(id, title, tags);
        this._lastCleaned = dateLastCleaned;
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
 这就是一个常见的建模错误。真实存在的卷轴和只存在于纸面上的目录项，是完全不同的两种东西。比如说，关于“如何治疗灰鳞病”的卷轴可能有好几卷，
 但在目录上却只记录一个条目。

 这样的建模错误很多时候可以置之不理。像“标题”和“标签”这样的数据，我可以认为就是目录中数据的副本。如果这些数据从不发生改变，我完全可以接受
 这样的表现形式。但如果需要更新其中某处数据，我就必须非常小心，确保同一个目录项对应的所有数据副本都被正确地更新。

 就算没有数据更新的问题，我还是希望改变这两个类之间的关系。把“目录项”作为“卷轴”的超类很可能会把未来的程序员搞迷糊，因此这是一个糟糕的模型。
 */

/**
 我首先在Scroll类中创建一个属性，令其指向一个新建的CatalogItem实例。
 */




