/**
 以这种方式创建的Customer对象是值对象。
 如果有5个订单都属于ID为123的顾客，就会有5个各自独立的Customer对象。对其中一个所做的修改，不会反映在其他几个对象身上。如果我想增强Customer对象，
 例如从客户服务获取到了更多关于顾客的信息，我必须用同样的数据更新所有5个对象。重复的对象总是会让我紧张——用多个对象代表同一个实体（例如一名顾客），这会
 招致混乱。如果Customer对象是可变的，问题就更加严重，因为各个对象之间的数据可能不一致。

 如果我想每次都使用同一个Customer对象，那么就需要有一个地方存储这个对象。每个应用程序中，存储实体的地方会各有不同，在最简单的情况下，我会使用一个
 仓库对象[mf-repos]。

 */

let _repositoryData;
export function initialize() {
    _repositoryData = {};
    _repositoryData.customers = new Map();
}
export function registerCustomer(id) {
    if (!_repositoryData.customers.has(id)) _repositoryData.customers.set(id, new Customer(id));
    return findCustomer(id);
}
export function findCustomer(id) {
    return _repositoryData.customers.get(id);
}
