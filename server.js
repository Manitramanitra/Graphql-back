const { buildSchema, graphql } = require("graphql");
const express = require("express");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const userData = require("./user.json");
const e = require("express");
const app = express();

app.use(morgan("dev"));

let fakeDb = [
  { id: 1, name: "Manitra", email: "Luc" },
  { id: 2, name: "Manoa", email: "Mickaella" } ,
];

var schema = buildSchema(`
    type Person {
        id: Int,
        name: String,
        email: String
    }
    type Query {
        users: [Person],
        user(id:Int): Person
        getMessage: String
      }
      type Mutation {
        addMsg(msg: String): String
        addUser(name:String,email:String): Person
        removeMessage: String
    }
`);

var root = {
  users: () => fakeDb,
  user: ({ id }) => userData.find((user) => user.id === id),
  addMsg: ({ msg }) => (fakeDb.message = msg),
  getMessage: () => fakeDb.message,
  removeMessage: () => (fakeDb.message = ""),
  addUser: ({ name, email }) => {
    fakeDb.push({ id: fakeDb.length + 1, name, email });
    return fakeDb[fakeDb.length - 1];
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("server runing on http://localhost:3000");
});
