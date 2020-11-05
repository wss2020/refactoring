//现在命令类已经是死代码了，可以用移除死代码（237）给它一个体面的葬礼。
function charge(customer, usage, provider) {
    const baseCharge = customer.baseRate * usage;
    return baseCharge + provider.connectionCharge;
}
monthCharge = charge(customer, usage, provider);



