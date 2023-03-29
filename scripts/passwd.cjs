var bcrypt = require('bcrypt');
var readline = require('readline');
var Writable = require('stream').Writable;

var mutableStdout = new Writable({
    write: function (chunk, encoding, callback) {
        if (!this.muted) process.stdout.write(chunk, encoding);
        callback();
    }
});

mutableStdout.muted = false;

var rl = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
});

rl.question('Password: ', (password) => {
    mutableStdout.muted = false;
    rl.question('Repeat Password: ', async (passwordAgain) => {
        if (password != passwordAgain || password == '') {
            console.log('\nFail');
        } else {
            console.log('\nResult:\n' + (await bcrypt.hash(password, await bcrypt.genSalt(13))).replace(/\$/g, '\\$'));
        }

        rl.close();
    });
    mutableStdout.muted = true;
});

mutableStdout.muted = true;
