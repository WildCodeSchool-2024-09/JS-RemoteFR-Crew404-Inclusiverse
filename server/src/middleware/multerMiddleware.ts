import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    // Je récupère l'extension du fichier
    const extension = file.originalname.split(".").pop();

    req.body.avatar = `${uniqueSuffix}.${extension}`;
    cb(null, `${uniqueSuffix}.${extension}`);
  },
});

const upload = multer({ storage: storage }).single("avatar");

export default upload;
