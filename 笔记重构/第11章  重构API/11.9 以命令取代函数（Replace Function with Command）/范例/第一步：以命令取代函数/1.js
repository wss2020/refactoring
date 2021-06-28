/**
 JavaScript语言有很多缺点，但把函数作为一等公民对待，是它最正确的设计决策之一。在不具备这种能力的编程语言中，
 我经常要费力为很常见的任务创建命令对象，JavaScript则省去了这些麻烦。不过，即便在JavaScript中，有时也需要用到
 命令对象。

 一个典型的应用场景就是拆解复杂的函数，以便我理解和修改。要想真正展示这个重构手法的价值，我需要一个长而复杂的
 函数，但这写起来太费事，你读起来也麻烦。所以我在这里展示的函数其实很短，并不真的需要本重构手法，还望读者权且包涵。
 下面的函数用于给一份保险申请评分。
 */

function score(candidate, medicalExam, scoringGuide) {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;

    if (medicalExam.isSmoker) {
        healthLevel += 10;
        highMedicalRiskFlag = true;
    }

    let certificationGrade = "regular";
    if (scoringGuide.stateWithLowCertification(candidate.originState)) {
        certificationGrade = "low";
        result -= 5;
    }

    // lots more code like this
    result -= Math.max(healthLevel - 5, 0);
    return result;
}


//我首先创建一个空的类，用搬移函数（198）把上述函数搬到这个类里去。


