const { buildSchema, graphql } = require("graphql");
const express = require("express");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const userData = require('./user.json')
const app = express();

app.use(morgan("dev"));

let fakeDb = {};

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
        removeMessage: String
    }
`);

var root = {
  users: ()=> userData,
  user:({id})=> userData.find(user=>user.id===id),
  addMsg:({msg}) => fakeDb.message = msg,
  getMessage: () => fakeDb.message,
  removeMessa: ()=>fakeDb.message=""
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
