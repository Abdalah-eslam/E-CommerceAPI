import multer from 'multer';
import path from 'path';



export function uploadSingle(fieldName: string ,Destination :string) {
    const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), `src/uploads/${Destination}`));
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  }
});

function fileFilter(req :any, file :any, cb :any) {
if (file.mimetype.startsWith('image')) {
    cb(null, true);
} else {
    cb(new Error('Not an image! Please upload only images.'));
}
}

const upload = multer({ storage, fileFilter });
return upload.single(fieldName);
}

export function uploadMultiple  (arrayfeilds: any,Destination :string)  {
      const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), `src/uploads/${Destination}`));
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  }
});

function fileFilter(req :any, file :any, cb :any) {
if (file.mimetype.startsWith('image')) {
    cb(null, true);
} else {
    cb(new Error('Not an image! Please upload only images.'));
}
}

const upload = multer({ storage, fileFilter });
    return upload.fields(arrayfeilds) 
}