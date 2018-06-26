const loremIpsum = require('lorem-ipsum');
const fs = require('fs');

const colors = ['AliceBlue',
  'AntiqueWhite',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'BlanchedAlmond',
  'Blue',
  'BlueViolet',
  'Brown',
  'BurlyWood',
  'CadetBlue',
  'Chartreuse',
  'Chocolate',
  'Coral',
  'CornflowerBlue',
  'Cornsilk',
  'Crimson',
  'Cyan',
  'DarkBlue',
  'DarkCyan',
  'DarkGoldenRod',
  'DarkGray',
  'DarkGrey',
  'DarkGreen',
  'DarkKhaki',
  'DarkMagenta',
  'DarkOliveGreen',
  'Darkorange',
  'DarkOrchid',
  'DarkRed',
  'DarkSalmon',
  'DarkSeaGreen',
  'DarkSlateBlue',
  'DarkSlateGray',
  'DarkSlateGrey',
  'DarkTurquoise',
  'DarkViolet',
  'DeepPink',
  'DeepSkyBlue',
  'DimGray',
  'DimGrey',
  'DodgerBlue',
  'FireBrick',
  'FloralWhite',
  'ForestGreen',
  'Fuchsia',
  'Gainsboro',
  'GhostWhite',
  'Gold',
  'GoldenRod',
  'Gray',
  'Grey',
  'Green',
  'GreenYellow',
  'HoneyDew',
  'HotPink',
  'IndianRed ',
  'Indigo ',
  'Ivory',
  'Khaki',
  'Lavender',
  'LavenderBlush',
  'LawnGreen',
  'LemonChiffon',
  'LightBlue',
  'LightCoral',
  'LightCyan',
  'LightGoldenRodYellow',
  'LightGray',
  'LightGrey',
  'LightGreen',
  'LightPink',
  'LightSalmon',
  'LightSeaGreen',
  'LightSkyBlue',
  'LightSlateGray',
  'LightSlateGrey',
  'LightSteelBlue',
  'LightYellow',
  'Lime',
  'LimeGreen',
  'Linen',
  'Magenta',
  'Maroon',
  'MediumAquaMarine',
  'MediumBlue',
  'MediumOrchid',
  'MediumPurple',
  'MediumSeaGreen',
  'MediumSlateBlue',
  'MediumSpringGreen',
  'MediumTurquoise',
  'MediumVioletRed',
  'MidnightBlue',
  'MintCream',
  'MistyRose',
  'Moccasin',
  'NavajoWhite',
  'Navy',
  'OldLace',
  'Olive',
  'OliveDrab',
  'Orange',
  'OrangeRed',
  'Orchid',
  'PaleGoldenRod',
  'PaleGreen',
  'PaleTurquoise',
  'PaleVioletRed',
  'PapayaWhip',
  'PeachPuff',
  'Peru',
  'Pink',
  'Plum',
  'PowderBlue',
  'Purple',
  'Red',
  'RosyBrown',
  'RoyalBlue',
  'SaddleBrown',
  'Salmon',
  'SandyBrown',
  'SeaGreen',
  'SeaShell',
  'Sienna',
  'Silver',
  'SkyBlue',
  'SlateBlue',
  'SlateGray',
  'SlateGrey',
  'Snow',
  'SpringGreen',
  'SteelBlue',
  'Tan',
  'Teal',
  'Thistle',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'White',
  'WhiteSmoke',
  'Yellow',
  'YellowGreen'];

const title = {
  count: 1, // Number of words, sentences, or paragraphs to generate.
  units: 'sentence', // Generate words, sentences, or paragraphs.
  sentenceLowerBound: 1, // Minimum words per sentence.
  sentenceUpperBound: 3, // Maximum words per sentence.
};

const threeWords = {
  count: 3, // Number of words, sentences, or paragraphs to generate.
  units: 'words', // Generate words, sentences, or paragraphs.
};

const description = {
  count: 1, // Number of words, sentences, or paragraphs to generate.
  units: 'paragraph', // Generate words, sentences, or paragraphs.
  sentenceLowerBound: 3, // Minimum words per sentence.
  sentenceUpperBound: 10, // Maximum words per sentence.
  paragraphLowerBound: 2, // Minimum sentences per paragraph.
  paragraphUpperBound: 3, // Maximum sentences per paragraph.
};

const sizes = [2, 4, 6, 8, 10, 12, 14];
const maxPrice = 250;
const randomSizes = () => sizes.slice(0, 2 + Math.floor(Math.random() * sizes.length));
const randomPrice = () => Math.ceil(Math.random() * maxPrice);
const randomColorIndex = () => Math.ceil(Math.random() * colors.length);

const append = (filename, resultString, count) => {
  fs.appendFileSync(`${filename}.tsv`, resultString);
  console.log(`Data was appended to ${filename}!`, count);
};

const generateProductDetails = () => {
  let resultString = '';
  for (let i = 1; i <= 10000000; i += 1) {
    const newArr = [`${loremIpsum(title)}`, `$${randomPrice()}`, `${loremIpsum(description)}`, `{${randomSizes()}}`, `${loremIpsum(threeWords)}`, `${loremIpsum(threeWords)}`, `${loremIpsum(threeWords)}`];
    const newLine = `${newArr.join('\t')}\n`;
    resultString = resultString.concat(newLine);
    if (i % 100000 === 0) {
      append('mockProductDetails', resultString, i);
      resultString = '';
    }
  }
};

const generateProductColors = () => {
  let resultString = '';
  for (let i = 1; i <= 10000000; i += 1) {
    for (let k = 0; k < 4; k += 1) {
      const newLine = `${i}\t${randomColorIndex()}\n`;
      resultString = resultString.concat(newLine);
    }
    if (i % 100000 === 0) {
      append('mockProductColors', resultString, i);
      resultString = '';
    }
  }
};

const generateColors = () => {
  for (let i = 0; i < colors.length; i += 1) {
    fs.appendFileSync('mockColors.tsv', `${colors[i]}\n`);
  }
};

generateProductColors();
generateProductDetails();
generateColors();
