# jv.angular-logging #

Angular module which provides you with flexible and powerful logging system. It supports various logger instances, log levels, handlers and formatters.

## Demo ##

[JSFiddle demonstrating logger objects, log levels, formatting](http://jsfiddle.net/04obdyg5/2/).

[JSFiddle demonstrating how $log object can be used with this module (Simple)](http://jsfiddle.net/t0e8z67u/2/).

[JSFiddle demonstrating how $log object can be used with this module (Advanced)](http://jsfiddle.net/t0e8z67u/3/).

## Installation ##

### 1) Install with [Bower](http://bower.io/). ###

```
bower install jv.angular-logging
```
 
### 2) Add `jv.angular-logging` to your dependencies. ###

```
angular.module('yourApp', ['jv.angular-logging']);
```

## Usage ##

There are various ways how to use this logging system.

### 1) Use preconfigured jvLog service ###

All you need to do is to inject `jvLog` service and you can use it instead of `$log` service.

```
jvLog.info('This is an example of log message');
jvLog.warn('Let\'s log some object', {firstName: 'Jan', lastName: 'Vorcak'});
```

### 2) Decorate `$log` instance. ###

By default, this module tries not to affect the default behavior of `$log` service. You can use `jvLog` and take advantage of this module's functionality while still using `$log` or `console` object elsewhere. However, if you want to keep using `$log` service and set various handlers and formatters, you can allow this module to decorate it.

```
angular.module('yourApp', ['jv.angular-logging'])
  .config(function(jvLoggingConfigProvider) {
    jvLoggingConfigProvider.setDecorateLog(true);
  });
```

Once done, you can just continue using `$log` service in your controllers.

```
$log.warn('Warrning message');
```

By default, `$log` object is replaced with `defaultLogger` (the same logger instance as `jvLog` or `jvLogging.getLogger()`. You can change this behavior by using following configuration.

```
angular.module('yourApp', ['jv.angular-logging'])
  .config(function(jvLoggingConfigProvider) {
    jvLoggingConfigProvider.setDecorateLog(true);
    jvLoggingConfigProvider.setDecoratorLogger('yourAppLogger');
  });
```

### 3) Manually create and configure your logger objects, for instance in your `run` method. ###

```
angular.module('yourApp', ['jv.angular-logging'])
  .run(function(jvLogging, JvFormatter, jvFormat, JvConsoleHandler) {
    var logger = jvLogging.getLogger('yourAppLogger');
    var handler = new JvConsoleHandler();
    var formatter = new JvFormatter.create(jvFormat.DATE('HH:mm:ss,sss'),
                                       jvFormat.HASH,
                                       jvFormat.NAME,
                                       jvFormat.MESSAGES);
    handler.setFormatter(formatter);
    logger.addHandler(handler);
  });
```

In your controller, just get an instance of a logger and start using it!

```
var logger = jvLogging.getLogger('yourAppLogger');
logger.log('Message to be logged');
```

## Advanced usage ##

### Log Levels ###

You can set the threshold on `handler` and `logger` object by using their `setLevel(lvl)` function causing all messages which are less severe than `lvl` to be ignored. Following table lists the numeric values used by default.

| Level name        | Level value    | Text representation (used by jvFormat.LEVEL) |
| ------------- |:--|:--|
| jvLogLevel.CRITICAL | 50 | CRITICAL |
| jvLogLevel.ERROR | 40 | ERROR |
| jvLogLevel.WARNING | 30 | WARNING |
| jvLogLevel.INFO | 20 | INFO |
| jvLogLevel.DEBUG | 10 | DEBUG |
| jvLogLevel.NOTSET | 0 | NOTSET |

### Formatters ###

`JvFormatter` service helps you to control how your messages are formatted by your handlers.

```
var handler = new JvConsoleHandler();
var formatter = new JvFormatter(jvFormat.DATE('HH:mm:ss,sss'),
                                       jvFormat.HASH,
                                       jvFormat.NAME,
                                       jvFormat.MESSAGES);
handler.setFormatter(formatter);
```

Following table describes all possible value that can be used in the log output.

| Formatter field        | Description   | Example |
| ------------- |:-------------|:-------------|
| jvFormat.DATE(format, timezone) | Current timestamp formatted based on [format](https://docs.angularjs.org/api/ng/filter/date)  | jvFormat.Date('HH:mm:ss,sss')  |
| jvFormat.LEVEL | Level name ||
| jvFormat.LEVEL_NUM | Level number ||
| jvFormat.HASH | $window.location.hash ||
| jvFormat.MESSAGES | Content to be logged ||
| jvFormat.NAME | Logger's name ||
