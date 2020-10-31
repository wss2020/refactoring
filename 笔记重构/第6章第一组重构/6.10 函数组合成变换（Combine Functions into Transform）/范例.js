/*
范例
   在我长大的国度，茶是生活中的重要部分，以至于我想象了这样一种特别的公共设施，专门给老百姓供应茶水。
   每个月，从这个设备上可以得到读数（reading），从而知道每位顾客取用了多少茶。
*/

reading = {customer: "ivan", quantity: 10, month: 5, year: 2017};

//几个不同地方的代码分别根据茶的用量进行计算。一处是计算应该向顾客收取的基本费用。
//客户端1...
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

//另一处是计算应该交税的费用—比基本费用要少，因为政府明智地认为，每个市民都有权免税享受一定量的茶水。

//客户端2...
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

/*
  浏览处理这些数据记录的代码，我发现有很多地方在做着相似的计算。
  这样的重复代码，一旦需要修改（我打赌这只是早晚的问题），就会造成麻烦。
  我可以用提炼函数（106）来处理这些重复的计算逻辑，但这样提炼出来的函数会散落在程序中，以后的程序员还是很难找到。
  说真的，我还真在另一块代码中找到了一个这样的函数。
 */

//客户端3...
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

/*  1。
   处理这种情况的一个办法是，把所有这些计算派生数据的逻辑搬移到一个变换函数中，
    该函数接受原始的“读数”作为输入，输出则是增强的“读数”记录，其中包含所有共用的派生数据。
    我先要创建一个变换函数，它要做的事很简单，就是复制输入的对象：
 */
function enrichReading(original) {
    const result = _.cloneDeep(original);
    return result;
}

/* 2.
   我用了Lodash库的cloneDeep函数来进行深复制。
   这个变换函数返回的本质上仍是原来的对象，只是添加了更多的信息在上面。
   对于这种函数，我喜欢用“enrich”（增强）这个词来给它命名。
   如果它生成的是跟原来完全不同的对象，我就会用“transform”（变换）来命名它。

   然后我挑选一处想要搬移的计算逻辑。首先，我用现在的enrichReading函数来增强“读数”记录，尽管该函数暂时还什么都没做。
 */
//客户端3...
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);

//然后我运用搬移函数（198）把calculateBaseCharge函数搬移到增强过程中：

function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    return result;
}

/*  3。
    在变换函数内部，我乐得直接修改结果对象，而不是每次都复制一个新对象。
    我喜欢不可变的数据，但在大部分编程语言中，保持数据完全不可变很困难。
    在程序模块的边界处，我做好了心理准备，多花些精力来支持不可变性。
    但在较小的范围内，我可以接受可变的数据。
    另外，我把这里用到的变量命名为aReading，表示它是一个累积变量（accumulating variable）。
    这样当我把更多的逻辑搬移到变换函数enrichReading中时，这个变量名也仍然适用。

    修改客户端代码，令其改用增强后的字段：
 */
//客户端3...
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = aReading.baseCharge;


/*  4。
   当所有调用calculateBaseCharge的地方都修改完成后，就可以把这个函数内嵌到enrichReading函数中，
    从而更清楚地表明态度：如果需要“计算基本费用”的逻辑，请使用增强后的记录。

   在这里要当心一个陷阱：在编写enrichReading函数时，我让它返回了增强后的读数记录，
    这背后隐含的意思是原始的读数记录不会被修改。所以我最好为此加个测试。
 */

it('check reading unchanged', function() {
    const baseReading = {customer: "ivan", quantity: 15, month: 5, year: 2017};
    const oracle = _.cloneDeep(baseReading);
    enrichReading(baseReading);
    assert.deepEqual(baseReading, oracle);
});


//现在我可以修改客户端1的代码，让它也使用这个新添的字段。
//客户端1...
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const baseCharge = aReading.baseCharge;



// 5。此时可以考虑用内联变量（123）去掉baseCharge变量。
// 现在我转头去看“计算应税费用”的逻辑。第一步是把变换函数用起来：

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));


/*
   本费用的计算逻辑马上就可以改用变换得到的新字段代替。
   如果计算逻辑比较复杂，我可以先运用提炼函数（106）。
   不过这里的情况足够简单，一步到位修改过来就行。
 */
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const base = aReading.baseCharge;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

//执行测试之后，我就用内联变量（123）去掉base变量：
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));

//然后把计算逻辑搬移到变换函数中：
function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result);
    result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
    return result;
}

//修改使用方代码，让它使用新添的字段。
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const taxableCharge = aReading.taxableCharge;

//测试。现在我可以再次用内联变量（123）把taxableCharge变量也去掉。

/*
   增强后的读数记录有一个大问题：如果某个客户端修改了一项数据的值，会发生什么？
   比如说，如果某处代码修改了quantity字段的值，就会导致数据不一致。
   在JavaScript中，避免这种情况最好的办法是不要使用本重构手法，改用函数组合成类（144）。
   如果编程语言支持不可变的数据结构，那么就没有这个问题了，那样的语言中会更常用到变换。
   但即便编程语言不支持数据结构不可变，如果数据是在只读的上下文中被使用（例如在网页上显示派生数据），还是可以使用变换。
 */
















































