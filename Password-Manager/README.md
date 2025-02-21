# Password Manager

Welcome to the **Password Manager** project! 🔐 This project provides a secure and efficient way to manage your passwords. It includes two different implementations:

1. **Local Storage Version:** Stores passwords in the browser's local storage.
2. **MongoDB Version:** Stores passwords securely in a MongoDB database.

## 📌 About the Project
This password manager allows users to:
- Add, view, edit, and delete passwords.
- Search for saved passwords quickly.
- Choose between local storage and a cloud-based MongoDB backend.

## 🚀 Project Structure
```
password-manager/
│
├─ local-storage-version/     # Password manager using browser local storage
├─ mongodb-version/           # Password manager using MongoDB for storage
├─ README.md                  # Project overview
└─ docs/                      # Additional documentation
```

## 🔧 Technologies Used
- **Front-end:** HTML, CSS, JavaScript
- **Back-end (MongoDB version):** Node.js, Express.js, MongoDB

## 📜 Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/your-username/password-manager.git
cd password-manager
```

### 2. Set Up Each Version
#### Local Storage Version
- Open `local-storage-version/index.html` in your browser.

#### MongoDB Version
1. Navigate to the `mongodb-version` folder:
```sh
cd mongodb-version
```
2. Install dependencies:
```sh
npm install
```
3. Set up the MongoDB connection in a `.env` file:
```
MONGO_URI=mongodb://localhost:27017/password-manager
PORT=5000
```
4. Start the server:
```sh
npm start
```

## 🌟 Local Storage Version
This version stores passwords directly in the browser's local storage. It is ideal for users who prefer a lightweight, client-side solution.

### 🚀 Features
- Add, edit, and delete passwords.
- Search functionality.
- Data stored in the browser's local storage.

### 📜 How to Run
1. Open `local-storage-version/index.html` in your browser.
2. Use the interface to manage your passwords.

### ⚠️ Limitations
- Data is stored locally and not synced across devices.
- Clearing browser storage deletes all saved passwords.

## 🌍 MongoDB Version
This version stores passwords securely in a MongoDB database, providing a more robust and cloud-based solution.

### 🚀 Features
- Secure password storage in MongoDB.
- CRUD operations for passwords.
- Encrypted data transfer between client and server.

### 📜 How to Run
1. Navigate to the `mongodb-version` folder:
```sh
cd mongodb-version
```
2. Install dependencies:
```sh
npm install
```
3. Create a `.env` file and configure MongoDB:
```
MONGO_URI=mongodb://localhost:27017/password-manager
PORT=5000
```
4. Start the server:
```sh
npm start
```
5. Open `http://localhost:5000` in your browser.

## 🌟 Contributions & Feedback
Contributions and suggestions are welcome! Feel free to open an issue or submit a pull request.

## 📜 License
This project is for educational purposes and personal use. Enjoy coding! 🚀