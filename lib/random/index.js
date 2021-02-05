#!/usr/bin/env node

const colors = require('colors');
const random = require('crypto-random-string');

const HELP_MSG = `usage: ${colors.blue('random')} ${colors.cyan('<LENGTH>')} ${colors.green('[TYPE] [CHARSET]')}

${colors.cyan('LENGTH')}  - Must be an non-negative integer.
${colors.green('TYPE')}    - See the examples.
${colors.green('CHARSET')} - The charset for generating the random string. Required only when TYPE is "custom".

Reference: https://www.npmjs.com/package/crypto-random-string

${colors.grey(`-- EXAMPLES --

$ random 10
2cf05d94db

$ random 10 base64
YMiMbaQl6I

$ random 10 url-safe
YN-tqc8pOw

$ random 10 numeric
8314659141

$ random 6 distinguishable
CDEHKM

$ random 10 ascii-printable
\`#Rt8$IK>B

$ random 10 alphanumeric
DMuKL8YtE7

$ random 10 custom abc
abaaccabac`)}
`;

const VALID_TYPES = ['base64', 'url-safe', 'numeric', 'distinguishable', 'ascii-printable', 'alphanumeric', 'custom'];

let [length, type, characters] = process.argv.slice(2);
length = parseInt(length);

if (Number.isNaN(length) || (type && !VALID_TYPES.includes(type)) || (type === 'custom' && !characters)) {
  console.error(HELP_MSG);
  process.exit(1);
}

if (type === 'custom') {
  console.log(random({ length, characters }));
} else if (type) {
  console.log(random({ length, type }));
} else {
  console.log(random({ length }));
}

