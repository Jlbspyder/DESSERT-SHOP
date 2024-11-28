import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter (req, file, cb) {
    const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
  // const filetypes = /jpe?g|png|webp/;
  // const mimetypes = /images\jpe?g|image\/png|image\/webp/;
 
  // const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // const mimetype = mimetypes.test(file.mimetype);
 
  // if (extname && mimetype) {
  //  cb(null, true)
  // } else {
  //  cb(new Error('Images only!'), false)
  // }
}

const upload = multer({  storage, fileFilter })
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
 uploadSingleImage(req, res, function (error) {
  if (error) {
    res.status(400).send({ message: error.message });
  }
  res.status(200).send({
    message: 'Image uploaded',
    image: `/${req.file.path}`
  });
 });
});

export default router;
