import multer from 'multer';
const storage = multer.memoryStorage();
const allowedMime = new Set([
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]);
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedMime.has(file.mimetype)) return cb(null, true);
    const okExt = /\.(csv|xlsx|xls)$/i.test(file.originalname);
    if (okExt) return cb(null, true);
    return cb(new Error('Only .csv, .xlsx, .xls files are allowed'));
  },
  limits: { fileSize: 10 * 1024 * 1024 }
});
