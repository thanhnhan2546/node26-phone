const express = require("express");
const app = express();
const v1 = require("./routers/v1");
const { AppError, handleErrors } = require("./helpers/error");
const { sequelize } = require("./models");
const jwt = require("jsonwebtoken");
const { createStaff } = require("./controllers/staff.controllers");
const { PORT } = require("./config");

app.use(express.json());
//get file từ server, nếu có static thì khi get hình ảnh không cần chữ static và ngược lại

app.use(express.static("."));
//cái này sẽ có dường dẫn là http://localhost:4000/static/1685639611948-423420322-NhapDiem-XemThoiHanDongHP-NhapDiem.drawio.png

// app.use(express.static("./static"));
//cái này sẽ có dường dẫn là http://localhost:4000/1685639611948-423420322-NhapDiem-XemThoiHanDongHP-NhapDiem.drawio.png

//--------------Tự động tạo các model và update các thay đổi trong model xuống DB---------------------
// sequelize.sync({ alter: true });

app.use("/api/v1", v1);

// demo handle error
/**
app.get("/error", (req, res) => {
  throw new AppError(500, "Internal Server");
});
*/

// Kỹ thuật middleware

// Middleware dùng để bắt và xử lý trả lỗi ra cho client
// Phải được đặt bên dưới các routers
app.use(handleErrors);

app.listen(PORT);
