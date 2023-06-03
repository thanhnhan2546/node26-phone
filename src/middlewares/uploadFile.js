//Muốn xử lý file phải thêm middleware xử lý file, vd: multer : yarn add multer
const multer = require("multer");
const path = require("path");

//sẽ lưu trong folder sourcecode luôn
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("file: ", file);
    console.log("req: ", req);
    const srcDir = path.join(__dirname, "src");
    //setup thư mục mà file được lưu vào
    callback(null, "./static/");
  },
  filename: (req, file, cb) => {
    console.log("file: ", file);
    // Override filename để tránh trường hợp cùng 1 thời điểm có 2 hoặc nhiều files cùng tên được upload
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9); //Math.round: làm tròn gần nhất
    // cb(null, `${file.fieldname}-${uniquSuffix}`);
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

const upload = multer({ storage });
module.exports = upload;
