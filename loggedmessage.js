//
// loggedmessage - "a simple but flexible console logging library with common-sense builtin modules and defaults"
// by N. Escobar / nickesc
//
// Source: https://github.com/nickesc/loggedmessage
//

// instantiate config object
let dotenvConfig = {};
const setDotenvConfig = (config) => { dotenvConfig = config; };

await import("dotenv")  // try to import dotenv if it is in the project
    .then((dotenv) => {  // on success set config and
        dotenv.config();
        setDotenvConfig(process.env);
    })
    .catch((err) => {
        // pass -- no abbreviation provided means no abbreviation added
    });


// set defaults
const prefixAbr = dotenvConfig.PREFIX_ABR || "";  // abbreviation string before the message type
const prefixSeparator = dotenvConfig.PREFIX_SEPARATOR || "";  // separator string between the abbreviation and message type

const defaultLogmPrefix   = `${prefixAbr}${prefixSeparator}${dotenvConfig.LOGM_PREFIX || "LOGM"}`;  // default message type for log messages
const defaultErrmPrefix   = `${prefixAbr}${prefixSeparator}${dotenvConfig.ERRM_PREFIX || "ERRM"}`;  // default message type for error messages
const defaultWarnmPrefix  = `${prefixAbr}${prefixSeparator}${dotenvConfig.WARNM_PREFIX || "WARNM"}`;  // default message type for warning messages
const defaultInfomPrefix  = `${prefixAbr}${prefixSeparator}${dotenvConfig.INFOM_PREFIX || "INFOM"}`;  // default message type for info messages
const defaultThrowmPrefix = `${prefixAbr}${prefixSeparator}${dotenvConfig.THROWM_PREFIX || "THROWM"}`;  // default message type for thrown error messages

const timemLocale = dotenvConfig.TIMEM_LOCALE || "en-US";  // set the time locale
function defaultTimemPrefix () {  // function to return the formatted time prefix on time messages
    return `${prefixAbr}${prefixSeparator}${new Date().toLocaleString(timemLocale)}`;
}

const defaultSeparator = dotenvConfig.MESSAGE_SEPARATOR || ":";  // separator string between the prefix and the message

const defaultLogMessage = dotenvConfig.LOG_MESSAGE || "a message was logged";  // default message text for a regular message
const defaultErrMessage = dotenvConfig.ERROR_MESSAGE || "an error occurred";  // default message text for an error

const defaultErr = null;  // default non-error for the error parameter


// return formatted error message string, with or without newline
function toString(prefix, separator){
    return `${prefix}${separator}`;
}

function checkObject(target){
    if (typeof target === "object"){
        return JSON.stringify(target);
    }
    return target;
}

/**
 * ### `logm()`
 *
 * Log a message to the console.
 *
 * @param    {any}     message    -  the message content.
 * @param    {string}  prefix     -  the message prefix text.
 * @param    {string}  separator  -  the separator string between the prefix and message text.
 * @returns  {string}  the full message string as `{prefix}{separator} {message}`.
 * @example
 * ###### Code:
 * ```js
 * logm("message","LOG"," |");
 * ```
 * ###### Output:
 * ```txt
 * LOG | message
 * ```
 */
function logm(message = null, prefix = null, separator = null){
    let logMessage = message || defaultLogMessage;  // set message content
    let logPrefix = prefix || defaultLogmPrefix;
    let logSeparator = separator || defaultSeparator;

    let logmString = toString(logPrefix, logSeparator);  // format string
    console.log(logmString, logMessage);  // log and return message

    return `${logmString} ${checkObject(logMessage)}`;
}

/**
 * ### `errm()`
 *
 * Log an error to the console with the desired message.
 *
 * @param    {any}     message    -  the error message content.
 * @param    {Error}   err        -  a target error to print to print.
 * @param    {string}  prefix     -  the error message prefix text.
 * @param    {string}  separator  -  the separator string between the prefix and error message text.
 * @returns  {string}  the full error message string as `{prefix}{separator} {message}`.
 * @example
 * ###### Code:
 * ```js
 * errm("message", new Error("error"),"ERROR"," |");
 * ```
 * ###### Output:
 * ```txt
 * ERROR | message
 *  Error: error
 *     at errorLocation
 * ```
 */
function errm(message = null, err = null, prefix = null, separator = null){
    let errMessage = message || defaultErrMessage;  // set error content
    let errErr = err || defaultErr;
    let errPrefix = prefix || defaultErrmPrefix;
    let errSeparator = separator|| defaultSeparator;

    let errmString = toString(errPrefix, errSeparator);  // format string
    if (errErr) {
        console.error(errmString, errMessage, "\n", errErr);  // log and return message
        return `${errmString} ${checkObject(errMessage)}\n`;
    }
    console.error(errmString, errMessage);
    return `${errmString} ${checkObject(errMessage)}`;

}

/**
 * ### `warnm()`
 *
 * Log a warning message/error to the console with the desired message.
 *
 * @param    {any}     message    -  the warning message content.
 * @param    {Error}   err        -  a target error to print.
 * @param    {string}  separator  -  the separator string between the prefix and warning message text.
 * @returns  {string}  the full warning message string as `{prefix}{separator} {message}`.
 * @example
 * ###### Code:
 * ```js
 * warnm("message", new Error("error")," |");
 * ```
 * ###### Output:
 * ```txt
 * WARNM | message
 *  Error: error
 *     at errorLocation
 * ```
 */
function warnm(message = null, err = null, separator = null){
    return errm(message, err, defaultWarnmPrefix, separator);  // send and return an error as a warning
}

/**
 * ### `infom()`
 *
 * Log an info message/error to the console with the desired message.
 *
 * @param    {any}     message    -  the info message content.
 * @param    {Error}   err        -  a target error to print.
 * @param    {string}  separator  -  the separator string between the prefix and info message text.
 * @returns  {string}  the full info message string as `{prefix}{separator} {message}`.
 * @example
 * ###### Code:
 * ```js
 * infom("message", new Error("error")," |");
 * ```
 * ###### Output:
 * ```txt
 * INFOM | message
 *  Error: error
 *     at errorLocation
 * ```
 */
function infom(message = null, err = null, separator = null){
    let infomPrefix = defaultInfomPrefix;  // set message content

    if (err){  // send an and return error/message as info
        return errm(message, err, infomPrefix, separator);
    } else {
        return logm(message, infomPrefix, separator);
    }
}

/**
 * ### `timem()`
 *
 * Log a message/error to the console with the desired message and the current time.
 *
 * @param    {any}     message    -  the message content.
 * @param    {Error}   err        -  a target error to print.
 * @param    {string}  separator  -  the separator string between the prefix and message text.
 * @returns  {string}  the full message string as `{prefix}{separator} {message}`.
 * @example
 * ###### Code:
 * ```js
 * timem("message", new Error("error")," |");
 * ```
 * ###### Output:
 * ```txt
 * 1/1/1999, 12:30:00 AM | message
 *  Error: error
 *     at errorLocation
 * ```
 */
function timem(message = null, err = null, separator = null) {
    let timemPrefix = defaultTimemPrefix();  // set message content

    if (err){ // send an and return error/message with time
        return errm(message, err, timemPrefix, separator);
    } else {
        return logm(message, timemPrefix, separator);
    }
}

/**
 * ### `printm()`
 *
 * Print a message to the console (wrapper for `console.log()`).
 *
 * @param    {any}     message         -  the message content.
 * @param    {...any}  optionalParams  -  additional values or objects for output.
 * @returns  {Array}  an array of the arguments passed.
 * @example
 * ###### Code:
 * ```js
 * printm("message", "additional output");
 * ```
 * ###### Output:
 * ```txt
 * message additional output
 * ```
 */
function printm(message, ...optionalParams) {
    console.log.apply(console, arguments);

    let returnArray = []
    for(let i=0; i<arguments.length; i++){
        returnArray.push(arguments[i])
    }
    return returnArray;
}

/**
 * ### `throwm()`
 *
 * Throw an error with the desired message.
 *
 * @param    {any}     message    -  the error message content.
 * @param    {Error}   err        -  a target error to print.
 * @param    {string}  prefix     -  the error message prefix text.
 * @param    {string}  separator  -  the separator string between the prefix and error message text.
 * @returns  {string}  the full error message string as `{prefix}{separator} {message}`.
 * @example
 * ###### Code:
 * ```js
 * throwm("message", new Error("error"),"ERROR"," |");
 * ```
 * ###### Output:
 * ```txt
 * ERROR | message
 * errorLocation
 * throwm("message", new Error("error"), "ERROR", " |");
 *                   ^
 * Error: error
 *     at errorLocation
 * ```
 */
function throwm(message = null, err = null, prefix = null, separator = null){
    let errMessage = message || defaultErrMessage;  // set error content
    let errErr = err || defaultErr;
    let errPrefix = prefix || defaultThrowmPrefix;
    let errSeparator = separator|| defaultSeparator;

    let errtString = toString(errPrefix, errSeparator);  // format string
    console.error(errtString, errMessage);  // log and throw error
    if (errErr){
        throw errErr;
    } else {
        throw new Error(`${toString(errPrefix, errSeparator)} ${checkObject(errMessage)}`);
    }
}

export { logm, errm, warnm, infom, timem, printm, throwm };
export default { logm, errm, warnm, infom, timem, printm, throwm };  // export functions
