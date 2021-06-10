import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';
import pkg from 'cloudinary';

const cloudinary = pkg;
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

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post(
  '/covers',
  upload.single('coverImage'),
  asyncHandler(async (req, res) => {
    const uploadPhoto = await cloudinary.v2.uploader.upload(`${req.file.path}`);
    res.send(uploadPhoto.url);
  })
);

router.post(
  '/images',
  upload.array('images', 5),
  asyncHandler(async (req, res) => {
    const imagesArray = [];
    for (let i = 0; i < req.files.length; i++) {
      const uploadPhotos = await cloudinary.v2.uploader.upload(
        `${req.files[i].path}`
      );
      imagesArray.push(uploadPhotos.url);
    }
    res.send(imagesArray);
  })
);

export default router;
