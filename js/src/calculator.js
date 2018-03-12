$(document).ready(function() {
    var equation = [];
    addButtonListeners(equation);
});

function addButtonListeners(eq) {
    $("#1").on("click", function() {buildNumber(1, eq)});
    $("#2").on("click", function() {buildNumber(2, eq)});
    $("#3").on("click", function() {buildNumber(3, eq)});
    $("#4").on("click", function() {buildNumber(4, eq)});
    $("#5").on("click", function() {buildNumber(5, eq)});
    $("#6").on("click", function() {buildNumber(6, eq)});
    $("#7").on("click", function() {buildNumber(7, eq)});
    $("#8").on("click", function() {buildNumber(8, eq)});
    $("#9").on("click", function() {buildNumber(9, eq)});
    $("#0").on("click", function() {buildNumber(0, eq)});
    $("#point").on("click", function() {buildNumber(".", eq)});

    $("#plus").on("click", function() {buildOperand("+", eq)});
    $("#minus").on("click", function() {buildOperand("-", eq)});
    $("#multiply").on("click", function() {buildOperand("*", eq)});

    $("#divide").on("click", function() {buildOperand("/", eq)});
    $("#clear").on("click", function() {buildClearButton(eq)});

    $("#equalsButton").click(function() {evaluate(eq)});
}

function buildNumber(num, eq) {
    var existingNumber = getLastNumber(eq, num) + num;
    eq[eq.length-1] = existingNumber;
}

function buildOperand(op, eq) {
    if (isValidOperandOrder(op, eq)) {
        eq.push(op);
    } else {
        // overwrite current op
        eq[eq.length-1] = op;
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
    } else if (equation[equation.length-1].contains)
    return equation[equation.length-1];
}

function lastOperandWasNotANumber(eq) {
    return operandNotANumber(eq[eq.length-1]);
}

function lastOperandWasANumber(eq) {
    return !lastOperandWasNotANumber(eq);
}

function operandNotANumber(num) {
    switch(num) {
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
