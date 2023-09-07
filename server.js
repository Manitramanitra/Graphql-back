const { buildSchema, graphql } = require("graphql");
const express = require("express");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");

const app = express();

app.use(morgan("dev"));

var schema = buildSchema(`
    type Person {
        name: String,
        email: String,
        weight: Float,
        age: Int,
    }
    type Developper{
        profil: Person
        experience: Int
    }
    type Query {
        manitra: Developper
        isDevelopper: Boolean
    }
`);

var root = {
  name: () => {
    return "Manitra Luc!";
  },
  email: () => {
    return "randiluc@gmail.com";
  },
  weight: () => 1.6,
  age: () => 23,
  isDevelopper: () => true,
  manitra: () => {
    return {
      profil: {
        name: "manitra",
        email: "randiluc@gmail.com",
        age: 23,
        weight: 50.4,
      },
      experience: 6,
    };
  },
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
