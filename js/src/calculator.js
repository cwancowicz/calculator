$(document).ready(function() {
    var equation = [];
    addButtonListeners(equation);
});

function addButtonListeners(equation) {
    $("#1").on("click", function() {buildNumber(1, equation)});
    $("#2").on("click", function() {buildNumber(2, equation)});
    $("#3").on("click", function() {buildNumber(3, equation)});
    $("#4").on("click", function() {buildNumber(4, equation)});
    $("#5").on("click", function() {buildNumber(5, equation)});
    $("#6").on("click", function() {buildNumber(6, equation)});
    $("#7").on("click", function() {buildNumber(7, equation)});
    $("#8").on("click", function() {buildNumber(8, equation)});
    $("#9").on("click", function() {buildNumber(9, equation)});
    $("#0").on("click", function() {buildNumber(0, equation)});

    $("#plus").on("click", function() {buildOperand("+", equation)});
    $("#minus").on("click", function() {buildOperand("-", equation)});

    $("#equalsButton").click(function() {evaluate(equation)});
}

function buildNumber(num, eq) {
    var existingNumber = getLastNumber(eq, num) + num;
    eq[eq.length-1] = existingNumber;
}

function buildOperand(op, eq) {
    if (isValidOperandOrder(op, eq)) {
        eq.push(op);
    } else {
        // don't add or throw error
    }
}

function isValidOperandOrder(op, eq) {
    return true;
}

function getLastNumber(equation, curNum) {

    if (equation.length == 0 || lastOperandWasNotANumber(equation)) {
        equation.push("");
    }
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
            return true;
        default:
            return false;
    }
}

function operandIsANumber(num) {
    return !operandNotANumber(num);
}

function evaluate(eq) {
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
        default:
            return "";
    }
}
