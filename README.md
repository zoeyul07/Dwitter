# Dwitter server

- 인증, 트위터 기능을 위한 api
- 실시간 트위터 생성을 위한 socket.io 연동
- mySQL, sequelize, mongoDB, mongoose 연동 테스트

## API

### tweets

- GET /tweets
- GET /tweets?username=:username
- GET /tweets/:id
- POST /tweets
- PUT /tweets/:id
- DELETE /tweets/:id

### auth

- POST /signup
- POST /login
- GET /me
