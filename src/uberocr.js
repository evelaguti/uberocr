const Tesseract = require("tesseract.js");
const jimp = require("jimp");
const chalk = require("chalk");

function changeBackground(url, out) {
  return jimp
    .read(url)
    .then(image => {
      // Do stuff with the image.
      return image
        .rgba(false)
        .background(0xffffff)
        .write(out);
    })
    .catch(err => {
      // Handle an exception.
      console.log(err);
    });
}

function progress(p) {
  if ("initializing tesseract" === p.status && p.progress === 1) {
    console.log(chalk.green("tesseract.js init!"));
  }
  if ("initializing api" === p.status && p.progress === 1) {
    console.log(chalk.green("api init!"));
  }
  if ("recognizing text" === p.status) {
    process.stdout.write(
      chalk.green("\rOCR image! " + Math.round(p.progress * 100))
    );
  }
}

let args = process.argv.slice(2);
const filename = "ocrimg.jpg";
if (args && args.length === 1) {
  changeBackground(args[0], filename).then(() => {
    Tesseract.recognize(filename, { lang: "eng" })
      .progress(p => progress(p))
      .catch(err => console.error(err))
      .then(function(result) {
        console.log(result.text);
        process.exit(0)
      });
  });
} else if (args.length === 2) {
  changeBackground(args[0], filename).then(() => {
    Tesseract.recognize(filename, { lang: args[1] })
      .progress(p => progress(p))
      .catch(err => console.error(err))
      .then(function(result) {
        console.log(result.text);
        process.exit(0);
      });
  });
}

module.exports = async function uberocr(url, lang) {
  return new Promise(resolve => {
    const filename = "ocrimg.jpg";
    resolve(
      changeBackground(url, filename).then(async function() {
        return await Tesseract.recognize(filename, { lang: lang })
          .progress(p => progress(p))
          .catch(err => console.error(err));
      })
    );
  });
};
