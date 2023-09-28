const { gql } = require("apollo-server");

const types = gql`
  enum Gender {
    male
    female
  }

  type WAND {
    wood: String
    core: String
    length: String
  }

  interface Character {
    id: ID!
    name: String
    gender: Gender
    wand: WAND
  }

  type NotHuman implements Character {
    id: ID!
    name: String
    gender: Gender
    species: String
    wand: WAND
  }

  type Human implements Character {
    id: ID!
    name: String
    gender: Gender
    dateOfBirth: String
    wand: WAND
    alive: Boolean
    image: String
    species: String
  }

  type Query {
    humans: [Human!]!
    human(id: Int!): Human
    notHumans: [NotHuman!]!
    characters: [Character!]!
  }
`;

module.exports = types;
