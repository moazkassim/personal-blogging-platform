# Blog API Project

A secure, RESTful API for a blogging platform built with Node.js, Express, and MongoDB. This project implements user authentication, CRUD operations for posts, and one-to-many relationships between authors and their content.

## 1. Setup and Run Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [MongoDB](https://www.mongodb.com/) (Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

    ### Steps
    1. **Clone the repository:**
       ```bash
       git clone <your-repo-url>
       cd <your-project-folder>
    2. **Clone the repository:**
       ```bash
       npm install
       
    3. **Environment Variables:** 
       Create a .env file in the root directory and add the following:
       
        PORT=3000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_key
    5. **Clone the repository:**
       ```bash
       npm run dev
## 2. Implemented Endpoints
    Method   Endpoint                      Description                      Auth Required
    POST     /api/auth/register            Register a new user              No
    POST     /api/auth/login               Login and receive a JWT          No
    POST     /api/post/posts               Create a new blog post           Yes
    GET      /api/post/posts               Fetch all blog posts             No
    PUT      /api/post/posts/:id           Update a post (owner only)       Yes
    DELETE   /api/post/posts/:id           Delete a post (owner only)       Yes
       
## 3. Database Choice: MongoDB
I chose MongoDB for this project for the following reasons:
1. Flexibility (NoSQL): MongoDB’s document-oriented structure allows for schema evolution. Adding new features (like comments or tags) is easier without complex 2 database migrations.
2. Scalability: Handles horizontal scaling natively, which is ideal for platforms with high-growth traffic.
3. Performance with JSON: Since the application stack (Node.js/Express) uses JSON, MongoDB's BSON storage eliminates the need for expensive data transformation.
