# User Service
Authentication, Authorization, Forgot Password and CRUD operations implementation on NestJs using PassportJs, MongoDb.

![nestjs-mongo](https://github.com/mehmetnuribolat/User-Auth-Service-NestJS/assets/145845943/697c57c4-9e28-4db5-96b8-f5924ee66b02)

## Features
- Authentication using PassportJs-JWT.
- Simple Forgot Password implementation with NodeMailer
- CRUD operations for User Entity.
- Reading environment variables from .env file
- Database Seeding
- Documentation of API using Swagger and Adding Custom Authentication for Swagger Document
- Simple Health Check Operation for Mongoose
- Clean Architecture
- Custom Guards, Filters, Interceptors
- Custom Response Wrapper

## 💻 Tech Stack

- Environment: [Node.js](https://nodejs.org/)
- Framework: [Nest.js](https://nestjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Object Mapping: [AutoMapper](https://automapperts.netlify.app/)
- Health Check: [Terminus](https://github.com/nestjs/terminus)
- Authentication: [Passport-JWT](www.passportjs.org)
- Mail Sender: [NodeMailer](https://nodemailer.com/)
- Object-Modelling: [Mongoose](https://mongoosejs.com/)
- Documentation: [Swagger](https://swagger.io/)
- Linting: [ESLint](https://eslint.org/)
- Code Formatting: [Prettier](https://prettier.io/)

## ⌨️ Development

First, you need to set all environment variables in `.env`. 
- You need to create MongoDB Connection String (`MONGO_CONNECTION_STRING`).
- You need to create App Password for Gmail. Follow instructions in [here](https://support.google.com/mail/answer/185833?hl=en). Add your email address (`MAIL_USER`) and generated app password (`MAIL_PASSWORD`) to .env file.
- You need to create JWT Secret Tokens (`JWT_ACCESS_TOKEN_SECRET`, `JWT_REFRESH_TOKEN_SECRET`)

### Install dependencies:

```
npm install
```

### Database Seeding:

```
npm run seed
```

### Execute application on development mode:

```
npm run start:debug
```

- Application will start on port number (`PORT`) which defined on `.env`
- For accessing Swagger Documentation, you should use http://localhost:3000/docs (for `PORT`= 3000) and you should use Username `SWAGGER_USERNAME`, `SWAGGER_PASSWORD` to login Swagger Documentation Page.

## :card_index_dividers: Resources
- [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Clean Node.js Architecture - With NEstJs and TypeScript](https://www.youtube.com/watch?v=jjczRbgHvVg)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mehmetnuribolat/User-Auth-Service-NestJS/issues).

## :pray: Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is under [MIT](https://github.com/mehmetnuribolat/User-Auth-Service-NestJS/blob/main/LICENSE) license.

