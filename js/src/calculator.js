$(document).ready(function () {
    var equation = [];
    addClasses();
    addButtonListeners(equation);
});

function addButtonListeners(eq) {

    $("#1").click(function () {
        buildNumber(1, eq)
    });
    $("#2").click(function () {
        buildNumber(2, eq)
    });
    $("#3").click(function () {
        buildNumber(3, eq)
    });
    $("#4").click(function () {
        buildNumber(4, eq)
    });
    $("#5").click(function () {
        buildNumber(5, eq)
    });
    $("#6").click(function () {
        buildNumber(6, eq)
    });
    $("#7").click(function () {
        buildNumber(7, eq)
    });
    $("#8").click(function () {
        buildNumber(8, eq)
    });
    $("#9").click(function () {
        buildNumber(9, eq)
    });
    $("#0").click(function () {
        buildNumber(0, eq)
    });
    $("#point").click(function () {
        buildNumber(".", eq)
    });

    $("#plus").click(function () {
        buildOperand("+", eq)
    });
    $("#minus").click(function () {
        buildOperand("-", eq)
    });
    $("#multiply").click(function () {
        buildOperand("*", eq)
    });

    $("#divide").click(function () {
        buildOperand("/", eq)
    });
    $("#clear").click(function () {
        buildClearButton(eq)
    });

    $("#equalsButton").click(function () {
        evaluate(eq)
    });
}

function addClasses() {
    var buttons = ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9", "#0", "#point", "#clear", "#plus", "#minus", "#multiply", "#divide"];
    addClassToElement(buttons, "btn-block");

    var buttonDivs = ["#div1", "#div2", "#div3", "#div4", "#div5",
        "#div6", "#div7", "#div8", "#div9",
        "#div0", "#divP", "#divC", "#divAdd", "#divSub", "#divMult", "#divDivide"];
    addClassToElement(buttonDivs, "col-sm-1");
}

function addClassToElement(elements, className) {
    elements.forEach(function (value) {
        $(value).addClass(className);
    });
}

function buildNumber(num, eq) {
    var existingNumber = getLastNumber(eq, num);
    if (num != "." || !existingNumber.includes(".")) {
        eq[eq.length - 1] = existingNumber + num;
    }
}

function buildOperand(op, eq) {
    if (isValidOperandOrder(op, eq)) {
        eq.push(op);
    } else {
        // overwrite current op
        eq[eq.length - 1] = op;
    }
}

function buildClearButton(eq) {
    eq.splice(0, eq.length);
}

function isValidOperandOrder(op, eq) {
    return lastOperandWasANumber(eq);
}

function getLastNumber(equation, curNum) {

    if (equation.length == 0 || lastOperandWasNotANumber(equation)) {
        equation.push("");
    }
    return equation[equation.length - 1];
}

function lastOperandWasNotANumber(eq) {
    return operandNotANumber(eq[eq.length - 1]);
}

function lastOperandWasANumber(eq) {
    return !lastOperandWasNotANumber(eq);
}

function operandNotANumber(num) {
    switch (num) {
        case "+":
        case "-":
        case "*":
        case "/":
            return true;
        default:
            return false;
    }
}

function operandIsANumber(num) {
    return !operandNotANumber(num);
}

function evaluate(eq) {
    if (lastOperandWasNotANumber(eq)) {
        return;
    }

    var value = 0;
    if (eq.length == 1 && operandIsANumber(eq[0])) {
        value = eq[0];
    } else {

        var lastNum = eq[0];
        var op = eq[1];
        var nextNum = eq[2];
        console.log(eq[0]);
        console.log(eq[1]);
        console.log(eq[2]);
        value += performOperand(lastNum, op, nextNum);

        var lastOp = "";
        var lastNum = "";
        for (var i = 3; i < eq.length; i++) {
            if (operandIsANumber(eq[i])) {
                lastNum = eq[i];
            } else {
                lastOp = eq[i];
            }

            if (lastOp != "" && lastNum != "") {
                value = performOperand(value, lastOp, lastNum);
                lastOp = "";
                lastNum = "";
            }
        }

    }
    $("#value").html(value);
}

function performOperand(firstNum, op, secNum) {
    switch (op) {
        case "+":
            return parseFloat(firstNum) + parseFloat(secNum);
        case "-":
            return parseFloat(firstNum) - parseFloat(secNum);
        case "*":
            return parseFloat(firstNum) * parseFloat(secNum);
        case "/":
            return parseFloat(firstNum) / parseFloat(secNum);
        default:
            return "";
    }
}
