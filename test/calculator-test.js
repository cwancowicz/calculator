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

    var value = element(by.id('value'));

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
});
