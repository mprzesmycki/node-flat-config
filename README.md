Flat Config Parser
====================

The goal of this project is to provide a simple module that can load a JSON 
defaults file, read a flat configuration file and parse command line arguments.

Synopsis
----------

Usually an application needs a basic `defaults` structure, some `config files` 
that override defaults and `command line arguments` that override the resulting
object.

The usual scenario is when **Flat Config** loads a JSON file for defaults,
then loads a `key-subkey=value` style configuration file and mixes that with 
command line arguments.

You may also provide **Flat Config** with any existing javascript object and
it will work. You can also provide an array of configuration entries instead of
the config file if you feel more comfortable with that.

API
-----

A basic example, the defaults:

    {
        "app": {
            "mainmodule": "lib/main", 
            "port": 8080
        }, 
        "limit": {
            "connections": 30,
            "entries": 4096
        },
        "quiet": true,
        "test": true
    }

The config file (/etc/myapp/myconfig):
    
    # a comment
    app.port=3080
    # another comment
    limit.connections=20
    entries=1024

The application loader (say app.js):

    // Initialize flatconfig
    var flatconfig = require('flatconfig');
    
    // Load the configuration
    var args = flatconfig.parseArgs(process.argv.slice(2)),
        config = flatconfig.loadSync(
                  path.resolve(__dirname, 'cfg.json'), 
                  path.resolve(process.cwd(), args['config']),
                  args),
    
    var app = require(config.app.mainmodule);
    app.init(config);

The invocation:
    
    node app --config=/etc/myapp/myconfig --no-test --no-quiet --app-port=4080

### The arguments/config file parser

The parser is based on traditional unix 'long-style' arguments, something like
`--a-key=a\ value`. 

Every hyphen in the config/argument name causes the parser will attempt to 
descend to the child object.

If the argument name starts with `--no-*` the parser will set the value to
`false`.

If the value is not given (`--argument`) the parser will set the value to
`true`.

See the example above.

### flatconfig.loadSync(defaults, [config, [args]])

A helper method that loads or uses the defaults, configuration and arguments.
Returns the resulting config object.

Parameters are:
 
* {Object|String} **defaults**: the base object to load
  - if an object it passed it will modify it
  - if a string is passed it will attempt to load a JSON file
* {Object|String} **config**: the configuration to mixin
  - a object listing the configuration directives is expected, or
  - a path pointing to the configuration file (absolute)
  - the argument is optional, empty values will be ignored
* {Array} **args**: the command line arguments
  - the command line arguments
  - if not given the default value is `process.argv.slice(2)`

### flatconfig.loadDefaults(path, callback)

**Not Yet Implemented**

### flatconfig.loadDefaultsSync(path)

**Not Yet Implemented**

### flatconfig.loadIni(path, flatobj, required, sect_delm, item_delm)

**To be documented**

### flatconfig.loadIniSync(path, flatobj, required, callback, sect_delm, item_delm)

**To be documented**

### flatconfig.setArgs(argv, flatobj)

**To be documented**

### flatconfig.flatten(obj, [args, [prefix]])

This is a helper function to flatten an object to a flat parameter hash.

Might be helpful to create a basic config file by listing all parameters 
within the defaults file.

Parameters:

* {Object} **obj**: object to flatten
* {Array} **args**: an optional object to build.
* {String} **prefix**: an optional prefix to start with (default: '--')

### flatconfig.deflatten(args, [obj])

This is a helper function to deflatten a flat parameter hash to an object.

Might be helpful to create a basic config file by listing all parameters 
within the defaults file.

Parameters:

* {Object} **obj**: object to flatten
* {Array} **args**: an optional object to build.

### flatconfig.parseArgs(args, [flatobj])

Parses the arguments to a flat hash.

Parameters:

* {Array} **args**: an argument list array
* {Object} **flatobj**: optional existing object to fill


Todo
======

Some thing still need work, especially:

* array handling (currently not even tested)
* loading multiple config files (currently achievable using `parseArgs`)
* better comments within the config files

License
=========

(The MIT License)

Copyright (c) 2012 Michał Czapracki budleigh.salterton@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
