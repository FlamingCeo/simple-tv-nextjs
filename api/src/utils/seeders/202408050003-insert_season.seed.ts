module.exports = {
  up: async (queryInterface: any) => {
    const seasons: any[] = [
      {
        season_id: 1,
        series_id: 1, // Breaking Bad
        no: 1,
        name: "Season 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        season_id: 2,
        series_id: 1, // Breaking Bad
        no: 2,
        name: "Season 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        season_id: 3,
        series_id: 2, // Game of Thrones
        no: 1,
        name: "Season 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        season_id: 4,
        series_id: 2, // Game of Thrones
        no: 2,
        name: "Season 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        season_id: 5,
        series_id: 3, // Stranger Things
        no: 1,
        name: "Season 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        season_id: 6,
        series_id: 3, // Stranger Things
        no: 2,
        name: "Season 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("seasons", seasons);
  },

  down: async (queryInterface: any) => {
    await queryInterface.bulkDelete("seasons", null, {});
  },
};
