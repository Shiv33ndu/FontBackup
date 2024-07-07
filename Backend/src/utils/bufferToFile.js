import fs from 'fs';

export const toFile = (buffer, fileType, fileName) => {
    const fileBuffer = Buffer.from('This is the content of the file.');

// Write buffer to a file on disk
const filePath = `public/temp/${fileName}.${fileType.toLowerCase()}`; // Specify the path where you want to save the file

fs.writeFile(filePath, buffer, (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log(`File ${filePath} has been written successfully`);
});

return filePath
} 