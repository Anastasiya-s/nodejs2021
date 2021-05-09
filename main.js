const fs = require('fs');
const { pipeline } = require('stream');
const { program } = require('commander');

const { alphabet } = require('./alphabet');

program.version('0.0.1');

program
  .requiredOption('-s, --shift <number>', 'a shift')
  .option('-i, --input <name>', 'an input file')
  .option('-o, --output <name>', 'an output file')
  .addOption(new program.Option('-a, --action', 'an action encode/decode').choices(['encode', 'decode']));
  

program.parse(process.argv);

const options = program.opts();
console.log(options)

if (options.action === undefined) console.log('choose action: ENCODE or DECODE');



const encode = text => {
  const contentChars = text.split('');
  const shift = options.shift > alphabet.length ? options.shift % alphabet.length : options.shift ;
  const resultChars = contentChars.map((char, index) => {
    if (alphabet.indexOf(char) === -1) {
      return char
    } else {
      const newIndex = alphabet.indexOf(char) + shift;
      return alphabet[newIndex]
    }
  })
  return resultChars.join('');
}

const content = fs.createReadStream(options.input, "utf8");
const outputContent = fs.createWriteStream(options.output, content);

content.pipe(encode).pipe(outputContent);


// const pathRead = '/path/to/file/read';
// const pathWrite = '/path/to/file/write';
// const options = {};

// const write = fs.createWriteStream(pathWrite, options);
// const read = fs.createReadStream(pathRead, options);


// read.pipe(write);