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
    wand(parent, _, { wands }) {
      return wands.find((item) => item.character_id == parent.id);
    },
  },
  WAND: {
    length(parent) {
      if (parent.length === "") return 0;
      else return parent.length;
    },
  },
  Query: {
    human(_, { id }, { characters }) {
      return characters.find((item) => item.id === id);
    },
    humans(_, __, { characters }) {
      return characters.filter((cha) => cha.species === "human");
    },
    notHumans(_, __, { characters }) {
      return characters.filter((cha) => cha.species !== "human");
    },
    characters: (_, __, { characters }) => characters,
  },
  Mutation: {
    createCharacter(_, { data }, { characters }) {
      console.log(data);
      const new_data = {
        ...data,
        id: characters.length + 1,
      };
      characters.push(new_data);
      return data;
    },
  },
};

module.exports = resolvers;
