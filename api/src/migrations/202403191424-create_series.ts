import { Series } from "@models/series.crm.model";
module.exports = {
  up: async (queryInterface: any) => {
    await queryInterface.createTable(Series.tableName, Series.getAttributes());
  },

  down: async (queryInterface: any) => {
    await queryInterface.dropTable(Series.tableName);
  },
};
