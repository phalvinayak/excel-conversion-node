const fs = require('fs');
const { LICENSE_TEXT_DIR } = require('../constants');

function fetchStandardLicense(licenseName) {
  const licenseDirPath = `${LICENSE_TEXT_DIR}`;
  const files = fs.readdirSync(licenseDirPath);
  const licenseFileName = `${licenseName}.txt`;
  let fileName;

  const fileExists = files.some(file => {
    if (file.toLocaleLowerCase() === licenseFileName.toLowerCase()) {
      fileName = file;
      return true;
    }
  });
  console.log('License Directory Path: ', licenseDirPath, licenseFileName, fileName);
  if(fileExists){
    return fs.readFileSync(`${licenseDirPath}/${fileName}`, {encoding: "utf8", flag: "r"});
  }
  return "";
}

module.exports = fetchStandardLicense;