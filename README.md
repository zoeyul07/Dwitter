# Dwitter server

- express 서버
- 인증, 트위터 기능을 위한 api
- validation
- 실시간 트위터 생성을 위한 socket.io 연동
- 각각의 브랜치에 mySQL(feature/mysql), sequelize(main), mongoDB(feature/mongodb), mongoose(feature/mongoose) 연동 테스트
- xss, csrf attack 대비
- rate limit 설정

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
- POST /logout
- GET /me
