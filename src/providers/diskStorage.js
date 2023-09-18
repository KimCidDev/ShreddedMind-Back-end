const fs = require('fs');
const path = require('path');
const uploadConfig = require('../configs/upload');

class DiskStorage {
  async saveFile(file) {
    try {
      // Use the unique name generated during upload
      const fileName = file;

      await fs.promises.rename(
        path.resolve(uploadConfig.TMP_FOLDER, fileName),
        path.resolve(uploadConfig.UPLOADS_FOLDER, fileName)
      );

      return fileName;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile(fileName) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, fileName);

    console.log('Deleting file:', filePath); // Add this line for debugging

    if (fs.existsSync(filePath)) {
      try {
        await fs.promises.unlink(filePath);
        console.log('File deleted:', fileName); // Add this line for debugging
      } catch (error) {
        console.log('Error deleting file:', error);
      }
    } else {
      console.log('File not found:', fileName);
    }
  }
}

module.exports = DiskStorage;
