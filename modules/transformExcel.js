const readExcelFile = require('./excelReader');
const wordWriter = require('./wordWriter');

function transformExcel(filePath, outputPath){
  return new Promise(async(resolve, reject) => {
    try {
      const rows = await readExcelFile(filePath);
      resolve(wordWriter(rows, outputPath));
    } catch(err) {
      console.log(err);
      reject(new Error(`Encounter an error while reading the excel file ${err.message}`));
    }
  });
}

module.exports = transformExcel;