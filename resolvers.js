const CharactersData = require("./potter.json");
const resolvers = {
  Query: {
    characters() {
      return CharactersData;
    },
  },
};

module.exports = resolvers;
