const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");

const upload = () => {
  return (req, res, next) => {
    const file = req.file;
    if (!file) {
      next(new AppError(400, "Missing file"));
    }

    // Có thể validate loại file và kích thước file bắng file.mimetype và type.size
    // if(file.size < 100000){
    //   next(new AppError(400, "File is too big"));
    // }

    //file.path.replace(/\\/g, "/") : thay đổi các ký tự \\ thành /
    const url = `http:/localhost:4000/${file.path.replace(/\\/g, "/")}`;

    res.status(200).json(response(url));
  };
};

module.exports = {
  upload,
};
