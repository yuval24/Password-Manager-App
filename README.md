# Password Manager App
Welcome to the Password Manager App! This application provides a secure and convenient way to manage your passwords and accounts. With JWT authentication and encryption of passwords stored in MongoDB, you can trust that your sensitive information remains protected.

Features
User Authentication: Secure authentication using JSON Web Tokens (JWT), ensuring that only authorized users can access the password manager features.

Password Encryption: Passwords are encrypted before storage in the database, providing an additional layer of security for user data.

Intuitive Interface: User-friendly interface for managing passwords and accounts, making it easy to add, view, update, and delete entries.

Technologies Used
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
Encryption: Crypto library for password encryption
Setup Instructions
Clone the Repository: Clone this repository to your local machine using the following command:

bash
Copy code
git clone https://github.com/your-username/password-manager-app.git
Install Dependencies: Navigate to the project directory and install dependencies for both the client and server:

bash
Copy code
cd password-manager-app
cd client && npm install
cd ../server && npm install
Set Up Environment Variables: Create a .env file in the server directory and configure the following environment variables:

plaintext
Copy code
MONGODB_URI=your_mongodb_connection_string
Run the Application: Start the development server for both the client and server:

bash
Copy code
In the client directory
npm start

In the server directory
nodemon app
Access the Application: Once the server is running, you can access the application in your web browser at http://localhost:3000.

License
This project is licensed under the MIT License.
