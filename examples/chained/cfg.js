
var path = require('path');

var config = module.exports;

config.application = {
    set base(v) {
    	this._base = path.resolve(process.env.HOME, v);
    },
    get base() {
    	return this._base || path.join(process.env.HOME, '.myapp');
    },
    core: {
        directories: true,
        executables: false,
        files: true
    },
    global: false,
    heads: 10,
};

config.include = function(key, file1, file2) {
    (this._includes = this._includes || []).concat(Array.prototype.slice.call(arguments, 1))
};

config.jailed = false;
config.kvm = false;

config.modules = function(name, arg1, arg2) {
    console.log('module', name, arg1, arg2);
};
