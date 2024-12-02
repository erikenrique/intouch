# intouch -- demo [here](https://intouch-n7mw.onrender.com/)

intouch is a web application designed to help users manage their contacts and monitor the status of their relationships. It provides a centralized platform to keep track of personal and professional connections, ensuring users stay connected and engaged.

<img src="https://github.com/user-attachments/assets/23685e71-a887-439b-8a67-fc7180d99f9e" alt="Intouch index page" width="50%">

---

## Features

- **Contact Management**: Add, edit, and organize your contacts with ease.
- **Relationship Tracking**: Monitor the status of your relationships and receive reminders to reach out.
- **Interaction History**: Maintain a log of past interactions to keep conversations meaningful.
- **User Authentication**: Securely access your contact information with personalized accounts.

---

## Tech Stack

- **Frontend**: EJS (Embedded JavaScript Templates), CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Passport.js

---

## Installation and Setup

Follow these steps to run intouch locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/erikenrique/intouch.git
   cd intouch

2. **Install dependencies:**

   ```bash
   npm install

3. **Set up env variables:**
   Create a .env file in the root directory and provide the following:

   ```makefile
   MONGO_URI=your_mongo_database_url
   SESSION_SECRET=your_session_secret


4. **Start the development server:**

   ```bash
   npm start

The application will be available at http://localhost:3000.
