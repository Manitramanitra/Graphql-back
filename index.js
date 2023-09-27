const { ApolloServer, gql } = require("apollo-server");
const CharactersData = require("./potter.json");

const types = gql`
  enum Gender {
    male
    female
  }

  type Wand {
    wood: String
    core: String
    length: String
  }

  type Characters {
    name: String!
    gender: Gender
    dateOfBirth: String
    wand: Wand
    alive: Boolean
    image: String
  }
  
  type Query {
    characters: [Characters!]!
  }
`;

const resolvers = {
  Query: {
    characters() {
      return CharactersData;
    },
  },
};

const server = new ApolloServer({ typeDefs: types, resolvers });

server.listen().then(({ url }) => {
  console.log("Server is running in" + url);
});
