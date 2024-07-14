## Project Overview
This project demonstrates my capabilities in both front-end and back-end development, focusing on Python (Django) and React. The application allows users to send interest messages to other users, accept or reject these messages, and if accepted, chat with each other in real-time.

## Core Features
### User Authentication:
Registration and login functionality.
### Sending Interests:
Logged-in users can browse a list of other users and send an interest message.
### Accepting/Rejecting Interests:
Users can view received interest messages and accept or reject them.
### Chat System:
If an interest is accepted, a chat interface is enabled where both users can send and receive messages in real-time.

## Documentation
### Prerequisites and Dependencies
#### Python 3.8+
#### Node.js 14+
#### Django 3.2+
#### React 17+
#### PostgreSQL 12+ (or SQLite for simplicity)
#### Docker (optional, for containerization)

### Step-by-Step Installation and Setup Instructions
Clone the Repository:


#### Copy code
git clone https://github.com/your-username/full-stack-app.git
cd full-stack-app
Backend Setup:

#### Navigate to the backend directory:

Copy code
cd backend
#### Create a virtual environment and activate it:

Copy code
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
#### Install dependencies:

Copy code
pip install -r requirements.txt
#### Set up the database:

Copy code
python manage.py makemigrations
python manage.py migrate
#### Create a superuser:

Copy code
python manage.py createsuperuser
#### Run the development server:

Copy code
python manage.py runserver

### Frontend Setup:

#### Open a new terminal and navigate to the frontend directory:

Copy code
cd frontend/core
#### Install dependencies:

Copy code
npm install
#### Start the development server:

Copy code
npm run dev
