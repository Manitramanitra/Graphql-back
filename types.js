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

  interface Character{
    name: String
    gender: Gender
  }

  type NotHuman implements Character {
    name: String
    gender: Gender
  }

  type Human implements Character{
    name: String
    gender: Gender
    dateOfBirth: String
    wand: Wand
    alive: Boolean
    image: String
    species: String
  }
  
  type Query {
    humans: [Human!]!
    notHumans: [NotHuman!]!
  }
`;

module.exports = types;