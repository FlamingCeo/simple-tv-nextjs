module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    const invoices = [
      {
        series_id: 1, // Breaking Bad
        user_id: 2, // Matches the user with user_id 2 from the users seeder
        season_id: 1, // Breaking Bad Season 1
        payment_date: new Date(),
        amount: 19.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        series_id: 2, // Game of Thrones
        user_id: 3, // Matches the user with user_id 3 from the users seeder
        season_id: 3, // Game of Thrones Season 1
        payment_date: new Date(),
        amount: 29.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        series_id: 3, // Stranger Things
        user_id: 4, // Matches the user with user_id 4 from the users seeder
        season_id: 5, // Stranger Things Season 1
        payment_date: new Date(),
        amount: 39.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
     await queryInterface.bulkInsert("payments", invoices);
        
  },

  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkDelete("payments", null, {});
  },
};
