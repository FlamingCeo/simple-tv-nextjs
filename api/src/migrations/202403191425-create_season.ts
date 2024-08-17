import { Season } from "@models/season.crm.model";
module.exports = {
  up: async (queryInterface: any) => {
    await queryInterface.createTable(Season.tableName, Season.getAttributes());
  },

  down: async (queryInterface: any) => {
    await queryInterface.dropTable(Season.tableName);
  },
};
