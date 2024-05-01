import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.originalname.split(".")[0];
    cb(null, fileName + "-" + uniqueSuffix + ".png");
  },
});

/* const storage = multer.memoryStorage();
const upload= multer({ storage,limits: { fileSize: 5 * 1024 * 1024 } });
export default upload; */
export default multer({ storage });
