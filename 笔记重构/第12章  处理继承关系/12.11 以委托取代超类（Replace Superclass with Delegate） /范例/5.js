/**
 基本的以委托取代超类重构到这里就完成了，不过在这个例子中，我还有一点收尾工作要做。

 前面的重构把CatalogItem变成了Scroll的一个组件：每个Scroll对象包含一个独一无二的CatalogItem对象。在使用本重构的很多情况下，这样处理就够了。
 但在这个例子中，更好的建模方式应该是：关于灰鳞病的一个目录项，对应于图书馆中的6份卷轴，因为这6份卷轴都是同一个标题。这实际上是要运用将值对象改为引用
 对象（256）。

 不过在使用将值对象改为引用对象（256）之前，还有一个问题需要先修好。在原来的继承结构中，Scroll类使用了CatalogItem类的id字段来保存自己的ID。但如
 果我把CatalogItem当作引用来处理，那么透过这个引用获得的ID就应该是目录项的ID，而不是卷轴的ID。也就是说，我需要在Scroll类上添加id字段，在创建
 Scroll对象时使用这个字段，而不是使用来自CatalogItem类的id字段。这一步既可以说是搬移，也可以说是拆分。
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
    constructor(id, title, tags, dateLastCleaned) {
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


/**
 用null作为ID值创建目录项，这种操作一般而言应该触发警报了，不过这只是我在重构过程中的临时状态，可以暂时忍受。等我重构完成，多个卷轴会指向一个
 共享的目录项，而后者也会有合适的ID。

 当前Scroll对象是从一个加载程序中加载的。
 */
// 加载程序...
const scrolls = aDocument
    .map(record => new Scroll(record.id,
        record.catalogData.title,
        record.catalogData.tags,
        LocalDate.parse(record.lastCleaned)));


/**
 将值对象改为引用对象（256）的第一步是要找到或者创建一个仓库对象（repository）。我发现有一个仓库对象可以很容易地导入加载程序中，这个仓库对象
 负责提供CatalogItem对象，并用ID作为索引。我的下一项任务就是要想办法把这个ID值放进Scroll对象的构造函数。还好，输入数据中有这个值，不过之前一直
 被无视了，因为在使用继承的时候用不着。把这些信息都理清楚，我就可以运用改变函数声明（124），把整个目录对象以及目录项的ID都作为参数传给Scroll的构造
 函数。
 */

