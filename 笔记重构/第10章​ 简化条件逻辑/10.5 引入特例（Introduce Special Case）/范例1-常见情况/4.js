//将所有调用处都改为使用isUnknown函数之后，就可以修改Site类，令其在顾客未知时返回UnknownCustomer对象。

class Site {
  get customer() {
    return (this._customer === "unknown") ? new UnknownCustomer() : this._customer;
  }
}



//然后修改isUnknown函数的判断逻辑。做完这步修改之后我可以做一次全文搜索，应该没有任何地方使用"unknown"字符串了。
//客户端1...
function isUnknown(arg) {
  if (!(arg instanceof Customer || arg instanceof UnknownCustomer))
    throw new Error(`investigate bad value: <${arg}>`);
  return arg.isUnknown;
}

