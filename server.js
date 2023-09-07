const { buildSchema, graphql } = require("graphql");
const express = require("express");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const userData = require('./user.json')
const app = express();

app.use(morgan("dev"));

var schema = buildSchema(`
    type Person {
        id: Int,
        name: String,
        email: String
    }
    type Query {
        users: [Person]
    }
`);

var root = {
  users: ()=> userData
};

// graphql(schema, "{email,hello}",root).then((response)=>{
//     console.log(response);
// });

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
