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

### 2) Decorate `$log` instance and continue using it in your application. ###

### 3) Manually create and configure your logger objects, for instance in your `run` method. ###

```
#!javascript

angular.module('yourApp', ['jv.angular-logging'])
  .run(function(jvLogging, jvFormatter) {
    // gets the default logger, identified by `_defaultLogger` name
    var logger = jvLogging.getLogger();
    logger.addHandler(new ConsoleHandler());
  });
```