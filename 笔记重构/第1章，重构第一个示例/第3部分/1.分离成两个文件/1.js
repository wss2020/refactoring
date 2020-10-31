/*
*  由于两个阶段已经彻底分离，我干脆把它搬移到另一个文件里去
* （并且修改了返回结果的变量名，与我一贯的编码风格保持一致）。
*
* */

/*statement.js

import createStatementData from './createStatementData.js';


createStatementData.js...

export default function createStatementData(invoice, plays) {
const result = {};

result.customer = invoice.customer;

result.performances = invoice.performances.map(enrichPerformance);
result.totalAmount = totalAmount(result);
result.totalVolumeCredits = totalVolumeCredits(result);

return result;

function enrichPerformance(aPerformance) {...}
function playFor(aPerformance) {...}
function amountFor(aPerformance) {...}
function volumeCreditsFor(aPerformance) {...}
function totalAmount(data) {...}
function totalVolumeCredits(data) {...}

}

*/
