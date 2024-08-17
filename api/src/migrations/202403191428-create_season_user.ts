import { UserAccess } from "@models/useraccess.crm.model";
module.exports = {
  up: async (queryInterface: any) => {
    await queryInterface.createTable(
      UserAccess.tableName,
      UserAccess.getAttributes()
    );
  },

  down: async (queryInterface: any) => {
    await queryInterface.dropTable(UserAccess.tableName);
  },
};
//
