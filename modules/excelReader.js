const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const { EXCEL_SCHEMA } = require('../constants');

function readExcelFile(file) {
  return new Promise(async(resolve, reject) => {
    try {
      let outputMapping = {};
      const sheets = await readXlsxFile(fs.createReadStream(file), { getSheets: true });
      for(sheet of sheets){
        await readXlsxFile(fs.createReadStream(file), { sheet: sheet.name, schema: EXCEL_SCHEMA }).then(({ rows, errors }) => {
          console.log(sheet.name, rows.length);
          if (errors.length) {
            throw new Error(`Unable to read data from sheet ${sheet.name}`);
          } else {
            rows.forEach((row) => {
              const copyrightArr = row.copyright.split("\n").map(copy => copy.trim());
              const licenseName  = row.licenseName.trim();
              const licenseText  = row.licenseText.trim();
              if (outputMapping[licenseName]) {
                outputMapping[licenseName].copyright.push(...copyrightArr);
                if(!outputMapping[licenseName].licenseName.includes(licenseText)){
                  outputMapping[licenseName].licenseName.push(licenseText);
                }
              } else {
                outputMapping[licenseName] = {
                  copyright: copyrightArr,
                  licenseName: [licenseText]
                }
              }
            });
          }
        });
      }
      resolve(outputMapping);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = readExcelFile;