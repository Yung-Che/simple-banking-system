# Design a simple banking system with these features: (Typescript)

- Implement System by restful API
- Account balance cannot be negative
- Create an account with name and balance
- Able to deposit money to an account
- Able to withdraw money from an account
- Able to transfer money from one account to another account
- Generate transaction logs for each account transfer(when, how much, to what account)
- Support atomic transaction
- Include unit tests & integration test
- provide a docker container run server
### P.S. Do not worry about persisting the data, you can save everything in-memory

### Build project
1. clone
```
git clone git@github.com:Yung-Che/simple-banking-system.git
```

2. install npm 
```
npm install
```

3. run serve
```
npm run serve
```
#### Or run docker
```
npm run docker:build
```
```
npm run docker:run
```

### Run Test
#### Unit tests
```
npm run test:unit
```

#### Integration test
```
npm run test:integration
```

#### All test
```
npm run test
```
