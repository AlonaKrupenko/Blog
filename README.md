**Features**

- View Posts: Fetch all posts and display them.
- View Single Post: View details of a single post with comments.
- Create Post: Add new posts through a modal.
- Edit Post: Update existing posts through a modal.
- Delete Post: Delete posts from the application.
- Add Comment: Add comments to posts.

**Tech Stack**
Frontend: React, Redux, Material UI
Backend: NestJS, TypeORM, PostgreSQL
State Management: Redux Toolkit

**API Endpoints**
The backend provides the following endpoints:
GET /posts: Fetch all posts with their associated comments.
GET /posts/:id: Fetch a single post by its ID.
POST /posts: Create a new post.
PUT /posts/:id: Update an existing post.
DELETE /posts/:id: Delete a post by ID.

_TO START YOU NEED CLONE REPOSITORY_
https://github.com/AlonaKrupenko/blog.git

**TO START BACKEND:**
    cd backend
    npm install

Add .env file root backend folder with next lines:
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=mysecretpassword
    DB_NAME=postgres
    PORT=4000

Set up the PostgreSQL database with Docker
    docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres

Run starting command: 
    npm run start


**TO START FRONTEND:**
    cd frontend
    npm install
    npm run start