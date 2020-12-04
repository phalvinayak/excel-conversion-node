const EXCEL_SCHEMA = {
  "Sl.no.": {
    prop: "slNo",
    type: Number,
  },
  "FOSS-Component": {
    prop: "fossComponent",
    type: String,
  },
  Version: {
    prop: "version",
    type: String,
  },
  "License Name": {
    prop: "licenseName",
    type: String,
  },
  Copyright: {
    prop: "copyright",
    type: String,
  },
  "License Text": {
    prop: "licenseText",
    type: String,
  },
};

const STANDARD_LICENSE = 'STANDARD';
const LICENSE_TEXT_DIR = './assets/licenseText';
const DOWNLOAD_PATH = '/file/download';
const TEMP_DIR = './temp_dir';

module.exports = {
  EXCEL_SCHEMA,
  STANDARD_LICENSE,
  LICENSE_TEXT_DIR,
  DOWNLOAD_PATH,
  TEMP_DIR
}