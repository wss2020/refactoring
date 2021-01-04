/**
    最后去除Scroll与CatalogItem之间的继承关系。
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
    constructor(id, title, tags, dateLastCleaned) {
        this._lastCleaned = dateLastCleaned;
        this._catalogItem = new CatalogItem(id, title, tags);
    }
    get id() {return this._catalogItem.id;}
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

/**
    基本的以委托取代超类重构到这里就完成了，不过在这个例子中，我还有一点收尾工作要做。

    前面的重构把CatalogItem变成了Scroll的一个组件：每个Scroll对象包含一个独一无二的CatalogItem对象。在使用本重构的很多情况下，这样处理就够了。
 但在这个例子中，更好的建模方式应该是：关于灰鳞病的一个目录项，对应于图书馆中的6份卷轴，因为这6份卷轴都是同一个标题。这实际上是要运用将值对象改为引用
 对象（256）。

 不过在使用将值对象改为引用对象（256）之前，还有一个问题需要先修好。在原来的继承结构中，Scroll类使用了CatalogItem类的id字段来保存自己的ID。但如
 果我把CatalogItem当作引用来处理，那么透过这个引用获得的ID就应该是目录项的ID，而不是卷轴的ID。也就是说，我需要在Scroll类上添加id字段，在创建
 Scroll对象时使用这个字段，而不是使用来自CatalogItem类的id字段。这一步既可以说是搬移，也可以说是拆分。
 */





