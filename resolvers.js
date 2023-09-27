const CharactersData = require("./potter.json");
const resolvers = {
  Query: {
    humans() {
      return CharactersData.filter((cha) => cha.species==="human");
    },
    notHumans(){
      return CharactersData.filter((cha)=> cha.species!=="human")
    }
  },
};

module.exports = resolvers;
