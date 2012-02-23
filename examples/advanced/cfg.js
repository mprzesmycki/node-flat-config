
var path = require('path');

var config = module.exports;

config.application = {
    base: path.join(process.env.HOME, '.myapp'),
    core: {
        directories: true,
        executables: false,
        files: true
    },
    global: false,
    heads: 10,
};

config.include = function(key, file1, file2) {
    console.log('include', key, file1, file2);
};

config.jailed = false;
config.kvm = false;

config.modules = function(name, arg1, arg2) {
    console.log('module', name, arg1, arg2);
};
