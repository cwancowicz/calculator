describe('calculator functions', function() {

    var equalId = element(by.id('equalsButton'));
    var oneId = element(by.id('1'));
    var twoId = element(by.id('2'));
    var threeId = element(by.id('3'));
    var fourId = element(by.id('4'));
    var fiveId = element(by.id('5'));
    var sixId = element(by.id('6'));
    var sevenId = element(by.id('7'));
    var eightId = element(by.id('8'));
    var nineId = element(by.id('9'));
    var zeroId = element(by.id('0'));

    var plusId = element(by.id('plus'));
    var minusId = element(by.id('minus'));
    var multiplyId = element(by.id('multiply'));
    var divideId = element(by.id('divide'));
    var clearId = element(by.id('clear'));
    var pointId = element(by.id('point'));

    var value = element(by.id('value'));
    var equation = element(by.id('equation'));

    beforeEach(function () {
        browser.waitForAngularEnabled(false);
        browser.resetUrl = "file:///"
        browser.get('file:///Users/cwancowicz/WebstormProjects/Calculator/html/Calculator.html')
    });

    it('should return correct title', function () {
        expect("Awesome Calculator").toEqual(browser.getTitle());
    });

    // reflexive tests
    it('should return 1 when 1 is entered', function () {
        oneId.click();
        equalId.click();
        expect(value.getText()).toEqual("1");
    });

    it('should build numbers greater than ones place', function () {
        oneId.click();
        oneId.click();
        equalId.click();
        expect(value.getText()).toEqual("11");
    });

    // addition
    it('should add two numbers', function () {
        oneId.click();
        plusId.click();
        sevenId.click();
        equalId.click();
        expect(value.getText()).toEqual("8");
    });

    it('should add three numbers', function() {
        oneId.click();
        plusId.click();
        fiveId.click();
        plusId.click();
        fourId.click();
        equalId.click();
        expect(value.getText()).toEqual("10");
    });

    it('should add four numbers', function() {
        oneId.click();
        plusId.click();
        fiveId.click();
        plusId.click();
        fourId.click();
        plusId.click();
        oneId.click();
        equalId.click();
        expect(value.getText()).toEqual("11");
    });

    // subtraction
    it('should subtract two numbers', function() {
        fiveId.click();
        minusId.click();
        twoId.click();
        equalId.click();
        expect(value.getText()).toEqual("3");
    });

    it('should subtract and be negative', function() {
       twoId.click();
       minusId.click();
       fiveId.click();
       equalId.click();
       expect(value.getText()).toEqual("-3");
    });

    // multiplication
    it('should multiply two numbers', function () {
       threeId.click();
       multiplyId.click();
       fourId.click();
       equalId.click();
       expect(value.getText()).toEqual("12");
    });

    // division
    it('should divide two numbers', function() {
        eightId.click();
        divideId.click();
        fourId.click();
        equalId.click();
        expect(value.getText()).toEqual("2");
    });

    // other
    it('should add, subtract, divide and multiply', function() {
        eightId.click();
        divideId.click();
        fourId.click();
        multiplyId.click();
        threeId.click();
        plusId.click();
        fiveId.click();
        minusId.click();
        sixId.click();
        equalId.click();
        expect(value.getText()).toEqual("5");
    });

    // clear
    it('should clear prior calculations and start new', function() {
       zeroId.click();
       plusId.click();
       threeId.click();
       minusId.click();
       clearId.click();
       twoId.click();
       plusId.click();
       nineId.click();
       equalId.click();
       expect(value.getText()).toEqual("11");
    });

    // decimal
    it('should add two decimal numbers', function() {
        threeId.click();
        pointId.click();
        oneId.click();
        plusId.click();
        twoId.click();
        pointId.click();
        fiveId.click();
        equalId.click();
        expect(value.getText()).toEqual("5.6");
    });

    // error checking
    it('should overwrite operand if consecutively pressed', function() {
        oneId.click();
        plusId.click();
        multiplyId.click();
        nineId.click();
        equalId.click();
        expect(value.getText()).toEqual("9");
    });

    it('should not evaluate if last input was not a number', function() {
        threeId.click();
        plusId.click();
        fourId.click();
        multiplyId.click();
        equalId.click();
        expect(value.getText()).toEqual("0");
    });

    it('should not allow to press operand when only single decimal', function() {
        pointId.click();
        plusId.click();
        twoId.click();
        equalId.click();
        expect(value.getText(".2"));
    });

    it('should not allow two or more decimals in number', function() {
        twoId.click();
        pointId.click();
        threeId.click();
        pointId.click();
        fourId.click();
        equalId.click();
        expect(value.getText()).toEqual("2.34");
    });

    it('should display numbers in textarea', function () {
        fiveId.click();
        expect(equation.getText()).toEqual("5");
    });

    it('should display operands in equation', function () {
        threeId.click();
        minusId.click();
        expect(equation.getText()).toEqual("3 -");
    });

    it('should display full equation', function () {
        threeId.click();
        minusId.click();
        sixId.click();
        expect(equation.getText()).toEqual("3 - 6");
    });

    it('should clear equation when clear button is pressed', function () {
        threeId.click();
        minusId.click();
        sixId.click();
        clearId.click();
        expect(equation.getText()).toEqual("0");
    });

    it('should clear value html when clear button is pressed', function () {
        threeId.click();
        minusId.click();
        sixId.click();
        equalId.click();
        clearId.click();
        expect(value.getText()).toEqual("0");
    });

    it('should not allow equation with non negative operand as first input', function () {
        plusId.click();
        expect(equation.getText()).toEqual("0");
    });

    it('should not overwrite equation with non negative operand as first input', function () {
        minusId.click();
        plusId.click();
        expect(equation.getText()).toEqual("-");
    });

    it('should allow negative as first operand', function () {
        minusId.click();
        expect(equation.getText()).toEqual("-");
    });

    it('should equate when negative is first input', function () {
        minusId.click();
        nineId.click();
        plusId.click();
        threeId.click();
        equalId.click();
        expect(value.getText()).toEqual("-6");
    });
});
