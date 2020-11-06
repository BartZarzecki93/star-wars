# star-wars

### Setup

```bash
npm install
```

### Development with nodemon and tsc --watch

```bash
npm run dev
```
Run redis. (Cache information for 24 hours on each endpoint)

### Run without nodemon and tsc --watch

```bash
npm start
```

Run redis. (Cache information for 24 hours on each endpoint)

Then use postman/insomnia with `http://localhost:8080/users` for registering and login in,
`http://localhost:8080/resources/` for getting the resources  


### Swagger

Visit `http://localhost:8080/api-docs/` to view the OPENAPI document in Swagger-UI