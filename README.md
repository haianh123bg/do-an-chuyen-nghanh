# HỆ THỐNG QUẢN LÝ KHÓA HỌC

## 1. Mô Tả Dự Án

Dự án "Hệ Thống Quản Lý Khóa Học" giúp quản lý việc đăng ký, theo dõi, và quản lý các khóa học cho sinh viên, giảng viên và quản trị viên. Hệ thống cung cấp các chức năng như:

- Đăng ký khóa học.
- Quản lý thông tin khóa học.
- Theo dõi tiến độ học tập của sinh viên.
- Quản lý tài nguyên học tập.
- Hệ thống điểm danh và chấm điểm.

## 2. Cấu Trúc Dự Án

Dự án được chia thành hai phần chính: **Frontend** và **Backend**.

### **Frontend**:
- Thư mục chính: `frontend/main`.
- Xây dựng giao diện người dùng, giúp sinh viên và giảng viên tương tác với hệ thống.

Cấu trúc thư mục frontend:
frontend/ └── main/ ├── src/ │ ├── components/ │ ├── pages/ │ ├── assets/ │ ├── services/ │ └── App.js └── package.json

### **Backend**:
- Thư mục chính: `backend/learn-programming`.
- Xử lý logic, quản lý cơ sở dữ liệu, xác thực người dùng và các dịch vụ API.

Cấu trúc thư mục backend:
backend/ └── learn-programming/ ├── src/ │ ├── main/ │ │ ├── java/com/example/coursemanagement/ │ │ ├── resources/ │ └── test/ ├── pom.xml └── README.md

## 3. Quy Trình Làm Việc Trên GitHub

### Trước Mỗi Phiên Làm Việc
1. **Pull Code Mới Nhất**:
 - Đảm bảo bạn có phiên bản code mới nhất từ remote repository:
   ```bash
   git checkout <branch_name>
   git pull origin <branch_name>
   ```

### Trong Quá Trình Làm Việc
2. **Tạo và Di Chuyển Branch**:
 - Tạo branch mới để làm việc:
   ```bash
   git checkout -b feature-branch
   ```
 - Di chuyển giữa các branch:
   ```bash
   git checkout <branch_name>
   ```

3. **Thực Hiện Công Việc và Commit**:
 - Thực hiện thay đổi trong code, sau đó sử dụng `git add` và `git commit` để lưu các thay đổi vào local repository:
   ```bash
   git add <file_name>
   git commit -m "Description of changes"
   ```

### Trước Khi Merge Code
4. **Pull Request (PR)**:
 - Push branch của bạn lên remote repository:
   ```bash
   git push origin feature-branch
   ```
 - Tạo Pull Request trên GitHub.
 - Chờ review và phản hồi từ nhóm trước khi merge.

### Lưu Ý Quan Trọng
- Giữ các commit nhỏ và có ý nghĩa.
- Viết message commit rõ ràng và mô tả đầy đủ về thay đổi.
- Đảm bảo code chạy ổn định trước khi tạo Pull Request.

## 4. Phần Mềm Cần Cài Đặt

### **Frontend**:
- **Node.js**: Để cài đặt các package và chạy frontend. [Tải Node.js](https://nodejs.org)
- **IDE**: Khuyến khích sử dụng **Visual Studio Code**. [Tải VS Code](https://code.visualstudio.com)

### **Backend**:
- **JDK 17**: Để biên dịch và chạy mã nguồn Java. [Tải JDK 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- **Maven**: Quản lý các dependencies của dự án backend. [Tải Maven](https://maven.apache.org)
- **IDE**: Khuyến khích sử dụng **IntelliJ IDEA**. [Tải IntelliJ IDEA](https://www.jetbrains.com/idea)

## 5. Cách Chạy Dự Án

### **Frontend**:
1. Mở terminal và điều hướng vào thư mục `main` trong frontend:
 ```bash
 cd frontend/main

2. Cài đặt các package cần thiết:
npm install

3. Chạy dự án frontend:
npm run dev

### **Backend**:
1. Mở terminal và điều hướng vào thư mục learn-programming trong backend:
cd backend/learn-programming

2. Cài đặt các dependencies:
mvn clean install

3. Chạy dự án backend:
mvn spring-boot:run