import fs from "fs";

function deleteFile(filePath: string) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    }
    //console.log("File deleted successfully");
  },);
}
export default deleteFile;
