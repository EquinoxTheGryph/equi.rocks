import bcrypt from 'bcrypt';
import readline from 'readline';
import { Writable } from 'stream';

const mutableStdout = new Writable({
    write: function (chunk, encoding, callback) {
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        if (!this.muted) process.stdout.write(chunk, encoding);
        callback();
    }
}) as Writable & { muted: boolean };

mutableStdout.muted = false;

const rl = readline.createInterface({
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
            console.log(
                '\nResult:\n' +
                    (await bcrypt.hash(password, await bcrypt.genSalt(13))).replace(/\$/g, '\\$')
            );
        }

        rl.close();
    });
    mutableStdout.muted = true;
});

mutableStdout.muted = true;
