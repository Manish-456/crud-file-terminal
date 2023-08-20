const EventEmitter = require("events");
const { fileActivity } = require("./utils/fileActivity");

class MyEventEmitter extends EventEmitter {}

const eventEmitter = new MyEventEmitter();

const command = process.argv[2].startsWith("--help")
  ? process.argv[2]
  : process.argv[3] === "--rm-folder"
  ? process.argv[3]
  : process.argv[4];

const folder =
  process.argv[2] === "--help"
    ? undefined
    : process.argv[3] === "--rm-folder"
    ? process.argv[2]
    : process.argv[2];
    
const filePath =
  process.argv[3] === "--rm-folder" ? undefined : process.argv[3];

let content = `Write your content here!`;

eventEmitter.on("playwithfile", (content) => {
  if (command && command !== "--help") {
    fileActivity({
      folder,
      filePath: filePath || "",
      content: content || "",
      command,
    });
  } else if (command === "--help") {
    console.log(`
   <foldername> <filename> --write-file  : "to create a new folder and file"
    <foldername> <filename> --append-file : "to append a content inside a specific file"
    <foldername> <filename> --rm-file : "to remove a file inside a folder"
    <foldername> --rm-folder : "to remove an empty folder"
    `);
  }
});

setTimeout(() => {
  eventEmitter.emit("playwithfile", content);
}, 2000);
