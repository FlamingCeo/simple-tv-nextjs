import { Payment } from "@models/payment.crm.model";
module.exports = {
  up: async (queryInterface: any) => {
    await queryInterface.createTable(
      Payment.tableName,
      Payment.getAttributes()
    );
  },

  down: async (queryInterface: any) => {
    await queryInterface.dropTable(Payment.tableName);
  },
};
//
