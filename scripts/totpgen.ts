import { customAlphabet } from 'nanoid';
import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';
import readline from 'readline/promises';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

const secret = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567')(32); // Base32

// Create a new TOTP object.
const totp = new OTPAuth.TOTP({
    issuer: 'equirocks',
    label: 'Equirocks',
    algorithm: 'SHA256',
    digits: 6,
    period: 30,
    secret
});

// Create a URI
const uri = totp.toString();

// Show a QR Code
console.log('QR code:', await QRCode.toString(uri, { type: 'utf8', scale: 1 }));
console.log('...Or use the following URI: ' + uri);
console.log();

let token: string | null = null;

do {
    token = await rl.question('Add the code to your authenticator and enter the resulting code: ');
} while (token === null);

const delta = totp.validate({
    token,
    window: 1
});

if (delta !== null) {
    console.log("Success, here's the secret you can use:", secret);
} else {
    console.log('Fail', delta);
}

rl.close();
