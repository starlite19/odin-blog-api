# ODIN Blog API
Project deployed on https://odin-blog-api-yr9b.onrender.com

- Note that it may take a while to load because the application is asleep

This project demonstrates the concepts of building a basic RESTful API using the following knowledge:
- Routers, Controllers
- PostgreSQL, Prisma ORM
- Authentication using Passport, Passport-jwt, JSON Web Token and bcrypt

Functionality:
- Sign up
- Login
- CRUD comments and posts
- Get comments under a post
- Create a comment under a post
- Update user role (i.e. regular user, or blog author)
- Log out

Missing Features:
- The corresponding front end code

Endpoints:

| Endpoint   | Method | Description |
| -------- | ------- | ------------- |
| /auth/login  | POST    | Login     |
| /auth/signup | POST    | Create regular user |
| /auth/logout    | GET    | Log out |
| /users | GET | Retrieve all users |
| /users/author | GET | Retrieve all author users |
| /users/regular | GET | Retrieve all regular users |
| /users/:userId | GET | Retrieve user by userId | 
| /users/:userId | PUT | Update userId's role (role should be in request body) | 
| /users/:userId | DELETE | Delete user by userId | 
| /posts | GET | Retrieve all posts |
| /posts | POST | Create a post |
| /posts/:postId | GET | Retrieve a single post by postId |
| /posts/:postId | PUT | Update postId's content (title, content, published should be in query params) |
| /posts/:postId | DELETE | Delete post by postId |
| /posts/:postId/comments | GET | Retrieve all comments under postId |
| /posts/:postId/comments | POST | Create a comment under postId |
| /comments/:commentId | GET | Retrieve comment by commentId |
| /comments/:commentId | PUT | Update commentId's content (content should be in request body) |
| /comments/:commentId | DELETE | Delete comment by commentId | 

Note: After login, a JWT token should be given in the JSON response. To access the `/users`, `/posts` and `/comments` endpoints, The JWT token should be added to the header (i.e. Authorization: Bearer &lt;TOKEN_VALUE&gt;).