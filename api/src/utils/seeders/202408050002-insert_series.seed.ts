module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    const series: any[] = [
      {
        series_id: 1,
        name: "Breaking Bad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        series_id: 2,
        name: "Game of Thrones",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        series_id: 3,
        name: "Stranger Things",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("series", series);
  },

  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkDelete("series", null, {});
  },
};
