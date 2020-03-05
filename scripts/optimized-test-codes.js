const { TextHandler } = require('./text-handler');
const fs = require('fs');

const encodedText = fs.readFileSync('encoded.txt', 'utf8');
const input = process.stdin;
input.setEncoding('utf-8');

console.log(`\n\nYou need to find the summation of the first 12345 prime numbers.\n
This number is the decryption key for the encoded text.\n
For example, the summation of the first 3 prime numbers is 10.\n
(10 = 2 + 3 + 5).\n\n
Please enter your answer:`);

input.on('data', function(data) {
  if (data === 'exit\n') {
    process.exit();
  } else {
    let textHandler = new TextHandler();
    let decodedText = textHandler.decode(data, encodedText);

    console.log(`\n\nDecoded text is...\n
    ------------------------------------\n
    ${decodedText}\n
    ------------------------------------\n`);

    process.exit();
  }
});
