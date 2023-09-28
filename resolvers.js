const CharactersData = require("./db/potter.json");
const Wands = require("./db/wand.json");

const resolvers = {
  Character: {
    __resolveType(character, context, info) {
      if (character.species !== "human") {
        return "NotHuman";
      }
      if (character.species === "human") {
        return "Human";
      }
      return null;
    },
  },
  Human: {
    wand(parent) {
      return Wands.find((item) => item.character_id == parent.id);
    },
  },
  WAND: {
    length(parent) {
      if (parent.length === "") return 0;
      else return parent.length;
    },
  },
  Query: {
    human(_, {id},context) {
      console.log(context);
      return CharactersData.find((item) => item.id === id);
    },
    humans() {
      return CharactersData.filter((cha) => cha.species === "human");
    },
    notHumans() {
      return CharactersData.filter((cha) => cha.species !== "human");
    },
    characters: () => CharactersData,
  },
};

module.exports = resolvers;
