import lm from "../loggedmessage.js";
import assert from "assert";
//import dotenv from "dotenv";
//dotenv.config()

const prefixAbr = process.env.PREFIX_ABR || "";
const prefixSeparator = process.env.PREFIX_SEPARATOR || "";

const testLogmPrefix = `${prefixAbr}${prefixSeparator}${process.env.LOGM_PREFIX || "LOGM"}`;
const testErrmPrefix = `${prefixAbr}${prefixSeparator}${process.env.ERRM_PREFIX || "ERRM"}`;
const testWarnmPrefix = `${prefixAbr}${prefixSeparator}${process.env.WARNM_PREFIX || "WARNM"}`;
const testInfomPrefix = `${prefixAbr}${prefixSeparator}${process.env.INFOM_PREFIX || "INFOM"}`;
const testThrowmPrefix = `${prefixAbr}${prefixSeparator}${process.env.THROWM_PREFIX || "THROWM"}`;

const testLocale = process.env.TIMEM_LOCALE || "en-US";
function testTimemPrefix() {
    return `${prefixAbr}${prefixSeparator}${new Date().toLocaleString(testLocale)}`;
}

const testSeparator = process.env.MESSAGE_SEPARATOR || ":";

const testLogMessage = process.env.LOG_MESSAGE || "a message was logged";
const testErrMessage = process.env.ERROR_MESSAGE || "an error occurred";
const testWarnMessage = process.env.WARN_MESSAGE || "a warning was logged";

const testerMessage = "test message"
const testerPrefix = "test prefix"
const testerSeparator = " ::"
const testerErrMessage = "This is an intentionally thrown error"
const testerError = new Error(testerErrMessage);

const testerPrint = "a regularly printed message"

const testerObject = {
    data: ["one", "two", "three"],
    number: 22557300,
    pool: {
        truefalse: {
            trueor: false,
            falseor: true,
        },
        things: ["billboards", "people", "occupations"],
        color: "red",
        log: lm,
    },
};


let test;
let testErr = null;

function breakBreak(){
    console.log("\n\n");
}

function testPrint(test, expectedResult){
    try{
        assert(JSON.stringify(test) == JSON.stringify(expectedResult), true);
    } catch (err) {
        console.error(new Error(`Did not test as equal (test top, expectedResult bottom):\n${test}\n${expectedResult}`))
        console.error("\n\nFAILURE: loggedmessage FAILED automated tests!\n\n");
        throw err;
    }
}

function testMessage(test, expectedResult){
    try{
        assert(test === expectedResult,true);
    } catch (err) {
        console.error(new Error(`Did not test as equal (test top, expectedResult bottom):\n${test}\n${expectedResult}`))
        console.error("\n\nFAILURE: loggedmessage FAILED automated tests!\n\n");
        throw err;
    }
}

function testThrow(message, err, prefix, separator, expectedResult){
    let testErr = null;
    try {
        lm.throwm(message,err,prefix,separator);
    } catch (err) {
        testErr = err;
        console.error(err);
    } finally {
        if (!testErr){
            console.error("\n\nFAILURE: loggedmessage FAILED automated tests!\n\n");
            throw new Error("Test failed to produce an error");
        }
        if( testErr.message !== expectedResult){
            console.error("\n\nFAILURE: loggedmessage FAILED automated tests!\n\n");
            throw new Error(`Did not test as equal (test top, expectedResult bottom):\n${test}\n${expectedResult}`);
        }

    }
}

function testLogm(){



    breakBreak();

    testMessage(
        lm.logm(),
        `${testLogmPrefix}${testSeparator} ${testLogMessage}`);
    testMessage(
        lm.logm(testerMessage),
        `${testLogmPrefix}${testSeparator} ${testerMessage}`);
    testMessage(
        lm.logm(testerMessage, testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${testerMessage}`);
    testMessage(
        lm.logm(testerMessage, testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${testerMessage}`);
    testMessage(
        lm.logm(testerMessage, testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${testerMessage}`);
    testMessage(
        lm.logm(undefined, undefined, undefined),
        `${testLogmPrefix}${testSeparator} ${testLogMessage}`);
    testMessage(
        lm.logm(undefined, undefined, undefined),
        `${testLogmPrefix}${testSeparator} ${testLogMessage}`);
    testMessage(
        lm.logm(undefined, undefined, testerSeparator),
        `${testLogmPrefix}${testerSeparator} ${testLogMessage}`);
    testMessage(
        lm.logm(undefined, undefined, testerSeparator),
        `${testLogmPrefix}${testerSeparator} ${testLogMessage}`);
    testMessage(
        lm.logm(testerObject),
        `${testLogmPrefix}${testSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.logm(testerObject, testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.logm(testerObject, testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.logm(testerObject, testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.logm(testerObject, undefined, undefined),
        `${testLogmPrefix}${testSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.logm("This is a log message"),
        `${testLogmPrefix}${testSeparator} ${"This is a log message"}`);

    breakBreak();

    testMessage(
        lm.errm(),
        `${testErrmPrefix}${testSeparator} ${testErrMessage}`);
    testMessage(
        lm.errm(testerMessage),
        `${testErrmPrefix}${testSeparator} ${testerMessage}`);
    testMessage(
        lm.errm(testerMessage, undefined, testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${testerMessage}`);
    testMessage(
        lm.errm(testerMessage, new Error(), testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${testerMessage}\n`);
    testMessage(
        lm.errm(testerMessage, testerError, testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${testerMessage}\n`);
    testMessage(
        lm.errm(undefined, testerError, undefined, undefined),
        `${testErrmPrefix}${testSeparator} ${testErrMessage}\n`);
    testMessage(
        lm.errm(undefined, new RangeError(), undefined, undefined),
        `${testErrmPrefix}${testSeparator} ${testErrMessage}\n`);
    testMessage(
        lm.errm(undefined, new RangeError(), undefined, testerSeparator),
        `${testErrmPrefix}${testerSeparator} ${testErrMessage}\n`);
    testMessage(
        lm.errm(undefined, testerError, undefined, testerSeparator),
        `${testErrmPrefix}${testerSeparator} ${testErrMessage}\n`);
    testMessage(
        lm.errm(testerObject),
        `${testErrmPrefix}${testSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.errm(testerObject, undefined, testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.errm(testerObject, new Error(), testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.errm(testerObject, testerError, testerPrefix, testerSeparator),
        `${testerPrefix}${testerSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.errm(testerObject, testerError, undefined, undefined),
        `${testErrmPrefix}${testSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.errm("Failed to connect to server"),
        `${testErrmPrefix}${testSeparator} ${"Failed to connect to server"}`);

    breakBreak();

    testMessage(
        lm.warnm(),
        `${testWarnmPrefix}${testSeparator} ${testWarnMessage}`);
    testMessage(
        lm.warnm(testerMessage),
        `${testWarnmPrefix}${testSeparator} ${testerMessage}`);
    testMessage(
        lm.warnm(testerMessage, undefined, testerSeparator),
        `${testWarnmPrefix}${testerSeparator} ${testerMessage}`);
    testMessage(
        lm.warnm(testerMessage, new Error(), testerSeparator),
        `${testWarnmPrefix}${testerSeparator} ${testerMessage}\n`);
    testMessage(
        lm.warnm(testerMessage, testerError, testerSeparator),
        `${testWarnmPrefix}${testerSeparator} ${testerMessage}\n`);
    testMessage(
        lm.warnm(undefined, testerError, undefined),
        `${testWarnmPrefix}${testSeparator} ${testWarnMessage}\n`);
    testMessage(
        lm.warnm(undefined, new SyntaxError(), undefined),
        `${testWarnmPrefix}${testSeparator} ${testWarnMessage}\n`);
    testMessage(
        lm.warnm(undefined, new SyntaxError(), testerSeparator),
        `${testWarnmPrefix}${testerSeparator} ${testWarnMessage}\n`);
    testMessage(
        lm.warnm(undefined, testerError, testerSeparator),
        `${testWarnmPrefix}${testerSeparator} ${testWarnMessage}\n`);
    testMessage(
        lm.warnm(testerObject),
        `${testWarnmPrefix}${testSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.warnm(testerObject, undefined, testerSeparator),
        `${testWarnmPrefix}${testerSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.warnm(testerObject, new Error(), testerSeparator),
        `${testWarnmPrefix}${testerSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.warnm(testerObject, testerError, testerSeparator),
        `${testWarnmPrefix}${testerSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.warnm(testerObject, testerError, undefined),
        `${testWarnmPrefix}${testSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.warnm("Request for /:user failed without authorization"),
        `${testWarnmPrefix}${testSeparator} ${"Request for /:user failed without authorization"}`);

    breakBreak();

    testMessage(
        lm.infom(),
        `${testInfomPrefix}${testSeparator} ${testLogMessage}`);
    testMessage(
        lm.infom(testerMessage),
        `${testInfomPrefix}${testSeparator} ${testerMessage}`);
    testMessage(
        lm.infom(testerMessage, undefined, testerSeparator),
        `${testInfomPrefix}${testerSeparator} ${testerMessage}`);
    testMessage(
        lm.infom(testerMessage, new Error(), testerSeparator),
        `${testInfomPrefix}${testerSeparator} ${testerMessage}\n`);
    testMessage(
        lm.infom(testerMessage, testerError, testerSeparator),
        `${testInfomPrefix}${testerSeparator} ${testerMessage}\n`);
    testMessage(
        lm.infom(undefined, testerError, undefined),
        `${testInfomPrefix}${testSeparator} ${testLogMessage}\n`);
    testMessage(
        lm.infom(undefined, new TypeError(), undefined),
        `${testInfomPrefix}${testSeparator} ${testLogMessage}\n`);
    testMessage(
        lm.infom(undefined, new TypeError(), testerSeparator),
        `${testInfomPrefix}${testerSeparator} ${testLogMessage}\n`);
    testMessage(
        lm.infom(undefined, testerError, testerSeparator),
        `${testInfomPrefix}${testerSeparator} ${testLogMessage}\n`);
    testMessage(
        lm.infom(testerObject),
        `${testInfomPrefix}${testSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.infom(testerObject, undefined, testerSeparator),
        `${testInfomPrefix}${testerSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.infom(testerObject, new Error(), testerSeparator),
        `${testInfomPrefix}${testerSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.infom(testerObject, testerError, testerSeparator),
        `${testInfomPrefix}${testerSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.infom(testerObject, testerError, undefined),
        `${testInfomPrefix}${testSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.infom("Server listening on port 3000"),
        `${testInfomPrefix}${testSeparator} ${"Server listening on port 3000"}`);

    breakBreak();

    testMessage(
        lm.timem(),
        `${testTimemPrefix()}${testSeparator} ${testLogMessage}`);
    testMessage(
        lm.timem(testerMessage),
        `${testTimemPrefix()}${testSeparator} ${testerMessage}`);
    testMessage(
        lm.timem(testerMessage, undefined, testerSeparator),
        `${testTimemPrefix()}${testerSeparator} ${testerMessage}`);
    testMessage(
        lm.timem(testerMessage, new Error(), testerSeparator),
        `${testTimemPrefix()}${testerSeparator} ${testerMessage}\n`);
    testMessage(
        lm.timem(testerMessage, testerError, testerSeparator),
        `${testTimemPrefix()}${testerSeparator} ${testerMessage}\n`);
    testMessage(
        lm.timem(undefined, testerError, undefined),
        `${testTimemPrefix()}${testSeparator} ${testErrMessage}\n`);
    testMessage(
        lm.timem(undefined, new EvalError(), undefined),
        `${testTimemPrefix()}${testSeparator} ${testErrMessage}\n`);
    testMessage(
        lm.timem(undefined, new EvalError(), testerSeparator),
        `${testTimemPrefix()}${testerSeparator} ${testErrMessage}\n`);
    testMessage(
        lm.timem(undefined, testerError, testerSeparator),
        `${testTimemPrefix()}${testerSeparator} ${testErrMessage}\n`);
    testMessage(
        lm.timem(testerObject),
        `${testTimemPrefix()}${testSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.timem(testerObject, undefined, testerSeparator),
        `${testTimemPrefix()}${testerSeparator} ${JSON.stringify(testerObject)}`);
    testMessage(
        lm.timem(testerObject, new Error(), testerSeparator),
        `${testTimemPrefix()}${testerSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.timem(testerObject, testerError, testerSeparator),
        `${testTimemPrefix()}${testerSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.timem(testerObject, testerError, undefined),
        `${testTimemPrefix()}${testSeparator} ${JSON.stringify(testerObject)}\n`);
    testMessage(
        lm.timem("Received a GET request for /"),
        `${testTimemPrefix()}${testSeparator} ${"Received a GET request for /"}`);

    breakBreak();

    testPrint(
        lm.printm(testerPrint),
        [testerPrint]);
    testPrint(
        lm.printm(testerPrint, testerObject),
        [testerPrint,testerObject]);
    testPrint(
        lm.printm(""),
        [""]);
    testPrint(
        lm.printm(),
        []);
    testPrint(
        lm.printm(undefined, undefined, undefined),
        [undefined, undefined, undefined]);
    testPrint(
        lm.printm(testLogmPrefix,testSeparator, testLogMessage),
        [testLogmPrefix,testSeparator, testLogMessage]);
    testPrint(
        lm.printm(testerMessage, testerObject, testerError),
        [testerMessage, testerObject, testerError]);

    breakBreak();

    testThrow(
        undefined, undefined, undefined, undefined,
        `${testThrowmPrefix}${testSeparator} ${testErrMessage}`);
    testThrow(
        testerMessage, undefined, undefined, undefined,
        `${testThrowmPrefix}${testSeparator} ${testerMessage}`);
    testThrow(
        testerMessage, undefined, testerPrefix, testerSeparator,
        `${testerPrefix}${testerSeparator} ${testerMessage}`);
    testThrow(
        testerMessage, new Error(), testerPrefix, testerSeparator,
        "");
    testThrow(
        testerMessage, testerError, testerPrefix, testerSeparator,
        testerErrMessage);
    testThrow(
        undefined, testerError, undefined, undefined,
        testerErrMessage);
    testThrow(
        undefined, new URIError(), undefined, undefined,
        "");
    testThrow(
        undefined, new URIError(), undefined, testerSeparator,
        "");
    testThrow(
        undefined, testerError, undefined, testerSeparator,
        testerErrMessage);
    testThrow(
        testerObject, undefined, undefined, undefined,
        `${testThrowmPrefix}${testSeparator} ${JSON.stringify(testerObject)}`);
    testThrow(
        testerObject, undefined, testerPrefix, testerSeparator,
        `${testerPrefix}${testerSeparator} ${JSON.stringify(testerObject)}`);
    testThrow(
        testerObject, new Error(), testerPrefix, testerSeparator,
        "");
    testThrow(
        testerObject, testerError, testerPrefix, testerSeparator,
        testerErrMessage);
    testThrow(
        testerObject, testerError, undefined, undefined,
        testerErrMessage);
    testThrow(
        "Invalid configuration file", undefined, undefined, undefined,
        `${testThrowmPrefix}${testSeparator} ${"Invalid configuration file"}`);
}

testLogm();
console.log("\n\nSUCCESS: loggedmessage PASSED automated tests!\n\n");
