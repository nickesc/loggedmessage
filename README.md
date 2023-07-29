<h3 align="center" >
  <a href="https://github.com/nickesc/loggedmessage"><img alt="Source: github.com/nickesc/loggedmessage" src="https://img.shields.io/badge/source-github.com/nickesc/loggedmessage-brightgreen?style=for-the-badge"></a><br>
  <a href="https://www.npmjs.com/package/loggedmessage"><img alt="NPM: npmjs.com/package/loggedmessage" src="https://img.shields.io/badge/npm-npmjs.com/package/loggedmessage-C12127?style=for-the-badge"></a>
  <br><br>
  <a href="https://github.com/nickesc/loggedmessage/actions/workflows/node.js.yml"><img style="margin-top: .5em" alt="Source: github.com/nickesc/loggedmessage" src="https://img.shields.io/github/actions/workflow/status/nickesc/loggedmessage/node.js.yml?logo=github&label=test"></a><br>
  <h3 align="center">
    <code>loggedmessage</code>
  </h3>
  <h4 align="center">
    <code>v1.0.0</code>
  </h4>
  <h6 align="center">
    by <a href="https://nickesc.github.io">N. Escobar</a> / <a href="https://github.com/nickesc">nickesc</a>
  </h6>
  <h6 align="center">
    a simple but flexible console logging library with <br> common-sense builtin functions and defaults
  </h6>
  <h4 align="center">
    <code style="font-size:.8em; padding: 5px;">npm i loggedmessage</code>
  </h4>
</h3>

<br>

## About `loggedmessage`

`loggedmessage` is a simple but flexible console logging library written in JavaScript with no dependencies. `loggedmessage` comes with common-sense builtin functions and defaults, and works right out of the box. 

The package provides you with functions like `logm` and `timem` to log messages to the console with standard formatting, as well as functions like `errm` and `throwm` for error handling.

### Install

Install `loggedmessage` using NPM:

```sh
npm i loggedmessage
```

### Basic Usage

Import `loggedmessage` with:
```js
import loggedmessage from "loggedmessage";
//  or
import { logm, errm, throwm, warnm, infom, timem } from "loggedmessage";
```

The core of `loggedmessage` is the logging functions it provides you. To log to the console:

``` js
import lm from "loggedmessage";

lm.logm("This is a log message") // output -> LOGM: This is a log message
lm.infom("Server listening on port 3000") // output -> INFOM: Server listening on port 3000
lm.timem("Received a GET request for /") // output -> M/D/Y, h:m:s AM: Received a GET request for /
lm.errm("Failed to connect to server") // output -> ERRM: Failed to connect to server
lm.warnm("Request for /:user failed without authorization") // output -> WARNM: Request for /:user failed without authorization
lm.throwm("Invalid configuration file") // output -> THROWM: "Invalid configuration file" -> thrown error
```

## Configuration

If `dotenv` is installed in the project, message defaults can be configured using a `.env` file:

```python
### Prefix abbreviation
### (leave commented to not print a prefix abbreviation)
PREFIX_ABR = "APP"

### Separator between abbreviation and prefix
### (leave commented to use the default separator)
PREFIX_SEPARATOR = "-"

### Default message type prefixes
### (leave commented to use the default prefixes)
LOGM_PREFIX   = "LOG"
ERRM_PREFIX   = "ERROR"
THROWM_PREFIX = "ERROR-THROWN"
WARNM_PREFIX  = "WARNING"
INFOM_PREFIX  = "INFORMATION"

### Default separator between the prefix and message
### (leave commented to use the default separator)
MESSAGE_SEPARATOR = " ::"

### Default text for undefined messages
### (leave commented to use the default text)
LOG_MESSAGE   = "a new message was logged"
ERROR_MESSAGE = "a new error has occurred"

### Time message locale
### (leave commented to use "en-US")
### ex.: "en-US", "en-GB", "ko-KR", "ar-EG", "ja-JP-u-ca-japanese", etc.
TIMEM_LOCALE = "en-GB"
```

If `dotenv` is not installed, `loggedmessage` will use builtin defaults.

# Documentation
## `logm()`

Log a message to the console.

### Parameters

*   `message` *( [`string`][1] | [`object`][2] )* - the message content. (optional, default `null`)
*   `prefix` *[`string`][1]* - the message prefix text. (optional, default `null`)
*   `separator` *[`string`][1]* - the separator string between the prefix and message text. (optional, default `null`)

### Examples

###### Code:
```js
logm("message","LOG"," |");
```

###### Output:
```txt
LOG | message
```

**Returns [*`string`*][1]** - the full message string as `{prefix}{separator} {message}`.


## `errm()`

Log an error to the console with the desired message.

### Parameters

*   `message` *( [`string`][1] | [`object`][2] )* - the error message content. (optional, default `null`)
*   `err` *[`error`][3]* - a target error to print to print. (optional, default `null`)
*   `prefix` *[`string`][1]* - the error message prefix text. (optional, default `null`)
*   `separator` *[`string`][1]* - the separator string between the prefix and error message text. (optional, default `null`)

### Examples

###### Code:
```js
errm("message", new Error("error"),"ERROR"," |");
```

###### Output:
```txt
ERROR | message
 Error: error
    at errorLocation
```

**Returns [*`string`*][1]** - the full error message string as `{prefix}{separator} {message}`.


## `throwm()`

Throw an error with the desired message.

### Parameters

*   `message` *( [`string`][1] | [`object`][2] )* - the error message content. (optional, default `null`)
*   `err` *[`error`][3]* - a target error to print. (optional, default `null`)
*   `prefix` *[`string`][1]* - the error message prefix text. (optional, default `null`)
*   `separator` *[`string`][1]* - the separator string between the prefix and error message text. (optional, default `null`)

### Examples

###### Code:
```js
throwm("message", new Error("error"),"ERROR"," |");
```

###### Output:
```txt
ERROR | message
errorLocation
throwm("message", new Error("error"), "ERROR", " |");
                  ^
Error: error
    at errorLocation
```

**Returns [*`string`*][1]** - the full error message string as `{prefix}{separator} {message}`.


## `warnm()`

Log a warning message/error to the console with the desired message.

### Parameters

*   `message` *( [`string`][1] | [`object`][2] )* - the warning message content. (optional, default `null`)
*   `err` *[`error`][3]* - a target error to print. (optional, default `null`)
*   `separator` *[`string`][1]* - the separator string between the prefix and warning message text. (optional, default `null`)

### Examples

###### Code:
```js
warnm("message", new Error("error")," |");
```

###### Output:
```txt
WARNM | message
 Error: error
    at errorLocation
```

**Returns [*`string`*][1]** - the full warning message string as `{prefix}{separator} {message}`.


## `infom()`

Log an info message/error to the console with the desired message.

### Parameters

*   `message` *( [`string`][1] | [`object`][2] )* - the info message content. (optional, default `null`)
*   `err` *[`error`][3]* - a target error to print. (optional, default `null`)
*   `separator` *[`string`][1]* - the separator string between the prefix and info message text. (optional, default `null`)

### Examples

###### Code:
```js
infom("message", new Error("error")," |");
```

###### Output:
```txt
INFOM | message
 Error: error
    at errorLocation
```

**Returns [*`string`*][1]** - the full info message string as `{prefix}{separator} {message}`.


## `timem()`

Log a message/error to the console with the desired message and the current time.

### Parameters

*   `message` *( [`string`][1] | [`object`][2] )* - the message content. (optional, default `null`)
*   `err` *[`error`][3]* - a target error to print. (optional, default `null`)
*   `separator` *[`string`][1]* - the separator string between the prefix and message text. (optional, default `null`)

### Examples

###### Code:
```js
timem("message", new Error("error")," |");
```

###### Output:
```txt
1/1/1999, 12:30:00 AM | message
 Error: error
    at errorLocation
```

**Returns [*`string`*][1]** - the full message string as `{prefix}{separator} {message}`.


## `printm()`

Print a message to the console (wrapper for `console.log()`).

### Parameters

*   `message` *( [`string`][1] | [`object`][2] )* - the message content.
*   `additionalOutput` *[`...object`][2]* - additional values or objects for output.

### Examples

###### Code:
```js
printm("message", "additional output");
```
###### Output:
```txt
message additional output
```

**Returns [*`string`*][1]** - the first message argument printed.

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error
