const express = require('express');
const uuid4  = require('uuid4');
const fs = require('fs');
const transformExcel = require('../modules/transformExcel');
const { DOWNLOAD_PATH, TEMP_DIR } = require('../constants');

const router = express.Router();

router.post('/upload', async(req, res) => {
  if(!req.files){
    res.send({
      status: false,
      message: 'No file uploaded'
    });
  } else {
    try {
      const inputFile = req.files['excel-input'];
      const id = uuid4();
      const filePath = `${TEMP_DIR}/${id}/${inputFile.name}`;
      const outputFileName = inputFile.name.replace(/(xlsx|xls)$/i, 'docx');
      const outputPath = `${TEMP_DIR}/${id}/${outputFileName}`;
      await inputFile.mv(filePath);
      await transformExcel(filePath, outputPath);
      fs.unlinkSync(filePath);
      res.send({
        status: true,
        downloadLink: `${DOWNLOAD_PATH}?fileIdentifier=${id}&fileName=${outputFileName}`
      });
    } catch(err) {
      res.send({
        status: false,
        message: 'Unable to transform the excel file'
      });
    }
  }
});

router.get('/download', async(req, res) => {
  try{
    const filePath = `${TEMP_DIR}/${req.query.fileIdentifier}/${req.query.fileName}`;
    if(fs.existsSync(filePath)){
      res.setHeader('Content-type', 'application/msword');
      res.download(filePath, req.query.fileName, () => {
        fs.unlinkSync(filePath);
        fs.rmdirSync(`${TEMP_DIR}/${req.query.fileIdentifier}`);
      });
    } else {
      res.send('File not present on the server');
    }
  } catch(err) {
    res.send('Something went wrong, please try again');
  }
});

module.exports = router;