const fs = require("fs");
const path = require("path");

const fsPromise = require("fs").promises;

function fileActivity({folder, filePath, content, command}) {
  const currFilePath = path.join(__dirname, "..");

  if (!fs.existsSync(path.join(currFilePath, folder))) {
    fs.mkdir(path.join(currFilePath, folder), (err, _) => {
      if (err) throw new Error(`Unable to create new Directory`);
      console.log(`new directory created`);
    });
  }
  const newFilePath = path.join(currFilePath, folder, filePath);
  const folderPath = path.join(currFilePath, folder);

  if (command === "--write-file" || command === "--append-file" && filePath) {
    fsPromise
      .appendFile(newFilePath, content)
      .then((_) =>
        console.log(` ${command === "--append-file" ? "Content appended" : "New file created"} : ${newFilePath}`)
      )
      .catch((err) => {
        throw new Error(`Unable to   at ${newFilePath}, ${err}`);
      });
  } else if (command === "--rm-file") {
    fsPromise
      .unlink(newFilePath)
      .then((_) => console.log(`File removed ${newFilePath}`))
      .catch((err) => {
        throw new Error(`Unable to remove file at ${newFilePath}, ${err}`);
      }); 
  } else if (command === "--rm-folder" && folder){
    fsPromise
    .rmdir(folderPath)
    .then((_) => console.log(`Folder removed ${folderPath}`))
    .catch((err) => {
      throw new Error(`Unable to remove folder at ${folderPath}, ${err}`);
    });
  }
}

module.exports = { fileActivity };
