# loopback-component-bunyan

Creates a Bunyan logger based on configuration in component-config.json file.

Here is a small example to illustrate:

```
{
	...
	"loopback-component-bunyan": {
		"level": "debug",
		"streams": [
			{
				"type": "prettystream",
			}, {
				"type": "logsene",
				"level": "info",
				"token": "Your Logsene Token"
			}
		]
	}
	...
}
```

The _type_ property is one of the following supported stream types:

* [prettystream](https://github.com/mrrama/node-bunyan-prettystream)
* [logentries](https://github.com/nemtsov/node-bunyan-logentries)
* [logsene](https://github.com/6RiverSystems/bunyan-logsene)

Unfortunately Bunyan does not support a stream registry the way Winston does, so for now this project will need to explicitly
include the necessary streams.

## Getting a Log object

The configuration above attaches a method `app.logger` which can be used to obtain a new logger for your module:

```
   let log = app.logger('MyComponent');

   log.debug({}, 'My log message');

```

## requestLogger Middleware

The component comes with a request logging middleware. Bellow is an example of how it can be connected.

```
# middleware.json
{
	...
	"routes": {
		"loopback-component-winston#requestLogger": {
			"params": {
				"level": "info",
				"msg": "${res.statusCode} ${req.method} ${res.time}ms ${req.decodedUrl}",
				"meta": false
			}
		},
		...
	}
	...
}
```

Available options:
* _level_ [String] log level to report request
* _msg_ [String] message template
* _meta_ [Boolean] whether or not to include request/response meta information such as headers, body, query...
