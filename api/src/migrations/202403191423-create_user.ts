import { User } from "@models/user.crm.model";
module.exports = {
  up: async (queryInterface: any) => {
    await queryInterface.createTable(User.tableName, User.getAttributes());
  },

  down: async (queryInterface: any) => {
    await queryInterface.dropTable(User.tableName);
  },
};