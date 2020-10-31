//原码
function rating(aDriver) {
    return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}
function moreThanFiveLateDeliveries(aDriver) {
    return aDriver.numberOfLateDeliveries > 5;
}
//重构后
function rating1(aDriver) {
    return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}







//原码
function rating(aDriver) {
    return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}
function moreThanFiveLateDeliveries(dvr) {
    return dvr.numberOfLateDeliveries > 5;
}
//重构后
function rating(aDriver) {
    return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}







//原码
function reportLines(aCustomer) {
    const lines = [];
    gatherCustomerData(lines, aCustomer);
    return lines;
}
function gatherCustomerData(out, aCustomer) {
    out.push(["name", aCustomer.name]);
    out.push(["location", aCustomer.location]);
}
//重构
function reportLines(aCustomer) {
    const lines = [];
    lines.push(["name", aCustomer.name]);
    lines.push(["location", aCustomer.location]);
    return lines;
}






















