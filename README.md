## Project Overview

This project demonstrates my capabilities in both front-end and back-end development, focusing on Python (Django) and React. The application allows users to send interest messages to other users, accept or reject these messages, and if accepted, chat with each other in real-time.

## Core Features

### User Authentication:
- Registration and login functionality.

### Sending Interests:
- Logged-in users can browse a list of other users and send an interest message.

### Accepting/Rejecting Interests:
- Users can view received interest messages and accept or reject them.

### Chat System:
- If an interest is accepted, a chat interface is enabled where both users can send and receive messages in real-time.

## Documentation

### Prerequisites and Dependencies

- Python 3.8+
- Node.js 14+
- Django 3.2+
- React 17+
- PostgreSQL 12+ (or SQLite for simplicity)
- Docker (optional, for containerization)

### Step-by-Step Installation and Setup Instructions

#### Backend Setup:

1. **Clone the Repository:**
   ```
   git clone https://github.com/saskue7/zentra_app.git
   cd zentra_app
   ```

2. **Navigate to the backend directory:**
   ```
   cd backend
   ```

3. **Create a virtual environment and activate it:**
   ```
   pipenv shell
   cd zentra_app
   ```

4. **Install dependencies:**
   ```
   pipenv install
   ```

5. **Set up the database:**
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create a superuser:**
   ```
   python manage.py createsuperuser
   ```

7. **Run the development server:**
   ```
   python manage.py runserver
   ```

#### Frontend Setup:

1. **Open a new terminal and navigate to the frontend directory:**
   ```
   cd frontend/core
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the development server:**
   ```
   npm run dev
   ```

## How to Run the Application

### Ensure the backend server is running:

1. Navigate to the backend directory:
   ```
   cd backend
   pipenv shell
   cd zentra_app
   python manage.py runserver
   ```

### Ensure the frontend server is running:

1. Navigate to the frontend directory:
   ```
   cd frontend/core
   npm run dev
   ```

2. Open your web browser and navigate to:
   ```
   http://localhost:8000
   ```

