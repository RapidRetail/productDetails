const loremIpsum = require('lorem-ipsum');
const fs = require('fs');
const validColors = require('./validColors.js');

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
const randomPrice = () => `$${Math.ceil(Math.random() * maxPrice)}`;
const randomColorIndex = () => Math.floor(Math.random() * colors.length);
const colorArray = () => {
  const result = [];
  for (let k = 0; k < 4; k += 1) {
    result.push(colors[randomColorIndex()]);
  }
  return result;
};

const append = (filename, resultString, count) => {
  fs.appendFileSync(`${filename}`, resultString);
  console.log(`Data was appended to ${filename}!`, count);
};

const generateCouchData = () => {
  let resultString = '';
  for (let i = 1; i <= 10000000; i += 1) {
    const newJSON = {
      productId: i,
      title: loremIpsum(title),
      price: randomPrice(),
      description: loremIpsum(description),
      size: randomSizes(),
      fabric: loremIpsum(threeWords),
      care: loremIpsum(threeWords),
      features: loremIpsum(threeWords),
      colors: colorArray(),
    };
    resultString = resultString.concat(`${JSON.stringify(newJSON)}\n`);
    if (i % 100000 === 0) {
      append('mockCouchData.json', resultString, i);
      resultString = '';
    }
  }
};

const generateProductDetails = () => {
  let resultString = '';
  for (let i = 1; i <= 10000000; i += 1) {
    const newArr = [`${loremIpsum(title)}`, `$${randomPrice()}`, `${loremIpsum(description)}`, `{${randomSizes()}}`, `${loremIpsum(threeWords)}`, `${loremIpsum(threeWords)}`, `${loremIpsum(threeWords)}`];
    const newLine = `${newArr.join('\t')}\n`;
    resultString = resultString.concat(newLine);
    if (i % 100000 === 0) {
      append('mockProductDetails.tsv', resultString, i);
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
      append('mockProductColors.tsv', resultString, i);
      resultString = '';
    }
  }
};

const generateColors = () => {
  for (let i = 0; i < validColors.colors.length; i += 1) {
    fs.appendFileSync('mockColors.tsv', `${validColors.colors[i]}\n`);
  }
};

generateCouchData();
generateProductColors();
generateProductDetails();
generateColors();
