# jvLogging #

Angular module which provides you with flexible and powerful logging system. It supports various logger instances, log levels, handlers and formatters.

## Installation ##

### 1) Install with [Bower](http://bower.io/). ###

```
#!sh

bower install jv.angular-logging
```
 
### 2) Add `'jv.angular-logging'` to your dependencies. ###

```
#!javascript
angular.module('yourApp', ['jv.angular-logging']);
```

## Usage ##

There are various ways how to use this logging system.

### 1) Use preconfigured jvLog service ###

All you need to do is to inject `jvLog` service and you can use it instead of `$log` service.

```
#!javascript
jvLog.info('This is an example of log message');
jvLog.warn('Let\'s log some object', {firstName: 'Jan', lastName: 'Vorcak'});
```

### 2) Decorate `$log` instance. ###

By default, this module tries not to affect the default behavior of `$log` service. You can use `jvLog` and take advantage of this module's functionality while still using `$log` or `console` object elsewhere. However, if you want to keep using `$log` service and set various handlers and formatters, you can allow this module to decorate it.

```
#!javascript
angular.module('yourApp', ['jv.angular-logging'])
  .config(function(jvLoggingConfigProvider) {
    jvLoggingConfigProvider.setDecorateLog(true);
  });
```

Once done, you can just continue using `$log` service in your controllers.

```
#!javascript
$log.warn('Warrning message');
```

By default, `$log` object is replaced with `defaultLogger` (the same logger instance as `jvLog` or `jvLogging.getLogger()`. You can change this behavior by using following configuration.

```
#!javascript
angular.module('yourApp', ['jv.angular-logging'])
  .config(function(jvLoggingConfigProvider) {
    jvLoggingConfigProvider.setDecorateLog(true);
    jvLoggingConfigProvider.setDecoratorLogger('yourAppLogger');
  });
```

### 3) Manually create and configure your logger objects, for instance in your `run` method. ###

```
#!javascript

angular.module('yourApp', ['jv.angular-logging'])
  .run(function(jvLogging, jvFormatter) {
    var logger = jvLogging.getLogger('yourAppLogger');
    var handler = new ConsoleHandler();
    var formatter = jvFormatter.create(jvFormatter.DATE('HH:mm:ss,sss'),
                                       jvFormatter.HASH,
                                       jvFormatter.NAME,
                                       jvFormatter.MESSAGES)
    handler.setFormatter(formatter);
    logger.addHandler(handler);
  });
```

In your controller, just get an instance of a logger and start using it!

```
#!javascript
var logger = jvLogging.getLogger('yourAppLogger');
logger.log('Message to be logged');
```

## Advanced usage ##

### Log Levels ###

You can set the threshold on `handler` and `logger` object by using their `setLevel(lvl)` function causing all messages which are less severe than `lvl` to be ignored. Following table lists the numeric values used by default.

| Level name        | Level value    |
| ------------- |:--|
| jvLogging.CRITICAL | 50 | 
| jvLogging.ERROR | 40 |
| jvLogging.WARNING | 30 |
| jvLogging.INFO | 20 |
| jvLogging.DEBUG | 10 |
| jvLogging.NOTSET | 0 |

### Formatters ###

`jvFormatter` service helps you to control how your messages are formatted by your handlers. You can create new Formatter by injecting `jvFormatter` and calling it's `create` method.

```
#!javascript
var handler = new ConsoleHandler();
var formatter = jvFormatter.create(jvFormatter.DATE('HH:mm:ss,sss'),
                                       jvFormatter.HASH,
                                       jvFormatter.NAME,
                                       jvFormatter.MESSAGES)
handler.setFormatter(formatter);
```

Following table describes all possible value that can be used in the log output.

| Formatter field        | Description   | Example |
| ------------- |:-------------|:-------------|
| jvFormatter.DATE(format, timezone) | Current timestamp formatted based on [format](https://docs.angularjs.org/api/ng/filter/date)  | jvFormatter.Date('HH:mm:ss,sss')  |
| jvFormatter.LEVEL | Level name ||
| jvFormatter.LEVEL_NUM | Level number ||
| jvFormatter.HASH | $window.location.hash ||
| jvFormatter.MESSAGES | Content to be logged ||
| jvFormatter.NAME | Logger's name ||
