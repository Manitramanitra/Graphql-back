const { gql } = require("apollo-server");

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

module.exports = types;