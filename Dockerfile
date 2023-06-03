# build project thành docker images

# build image dựa trên image của node: v18
FROM node:18-alpine

# setup working directory
# tạo một directory bên trong image để chứa code của ứng dụng
# vd: tạo folder(directory) app để chứa code
WORKDIR /app

# Copy toàn bộ code của ứng dụng (nguyên project) vào bên trong directory

# source: để . thì toàn bộ project của mình (bắt đầu từ project)
# dest (destination): nếu để . thì copy toàn bộ project vào folder app (bắt đầu từ app)
COPY . .

# RUN: thực thi một câu lện bên trong working directoty
# mặc định không có yarn, nếu muốn có phải cài đặt yarn vào, trong image là hđh linux
RUN npm install

# cho phép quyền thực thi
RUN chmod +x wait-for


# EXPOSE : define cái port listen, image sẽ sử dụng port 400, phải trùng với port listen trong project
EXPOSE 4000

# CMD: một câu lệnh executing container(run cái ứng dụng)
CMD ["node", "src/index.js"]



# để build project thành images: 
# 1. Mở terminal ngay folder mà Dokerfile đang đứng
# 2. Dùng câu lênh: docker build -t <tên image>:<tag> <path trỏ tới dockerfile>

# -t: flag để đặt tên cho image
#  tag: nếu không có thì mặc định sẽ là lastest
# <path trỏ tới dockerfile>: khi mở terminal ngày folder dockerfile đang đứng thì path chỉ cần "."

# rung images thành một container để chạy chương trình:
# docker run --name <tên container> -p <public port>:<private port> -d <tên image>