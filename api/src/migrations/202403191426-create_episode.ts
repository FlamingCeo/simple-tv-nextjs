import { Episode } from "@models/episode.crm.model";
module.exports = {
  up: async (queryInterface: any) => {
    await queryInterface.createTable(
      Episode.tableName,
      Episode.getAttributes()
    );
  },

  down: async (queryInterface: any) => {
    await queryInterface.dropTable(Episode.tableName);
  },
};
//