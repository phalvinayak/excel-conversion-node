const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const fs = require('fs');
const fetchStandardLicense = require('./standardLicense');
const { STANDARD_LICENSE } = require('../constants');

function wordWriter(content, outputPath) {
  return new Promise((resolve, reject) => {
    try{
      const doc = new Document({
        creator: "Vinayak Phal",
        description: "Document with the license details",
        title: "License Details",
      });

      let paragraphs = [];
      Object.keys(content).map(license => {
        const licenseDetails = content[license];
        const copyrightArr =  licenseDetails.copyright;
        const licenseNameArr = licenseDetails.licenseName;

        paragraphs.push(
          new Paragraph({
            text: license,
            heading: HeadingLevel.HEADING_2,
            spacing: {
              before: 200,
            }
          })
        )
        paragraphs.push(...copyrightArr.map(copyright => new Paragraph({text: copyright})));

        for(licenseType of licenseNameArr){
          if('NA' === licenseType.toUpperCase()){
            continue;
          } else if(STANDARD_LICENSE === licenseType.toUpperCase()){
            const text = fetchStandardLicense(license);
            if(text.trim()){
              paragraphs.push(new Paragraph({
                text,
                spacing: {
                  before: 200,
                }
              }));
            }
          } else {
            paragraphs.push(new Paragraph({
              text: licenseType,
              spacing: {
                before: 200,
              }
            }));
          }
        }
      });

      doc.addSection({
        properties: {},
        children: paragraphs
      });

      Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(outputPath, buffer);
        resolve(outputPath);
      });
    } catch(err) {
      reject(err);
    }
  });
}

module.exports = wordWriter;