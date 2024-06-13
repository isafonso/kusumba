import multer from "multer";
import path from "node:path";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "../../public/uploads"));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.originalname.split(".")[0] +
        Date.now().toString() +
        path.extname(file.originalname)
    );
  },
});
