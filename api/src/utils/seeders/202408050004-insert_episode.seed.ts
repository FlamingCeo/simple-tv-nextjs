module.exports = {
  up: async (queryInterface: any) => {
    const episodes: any[] = [
      {
        episode_id: 1,
        series_id: 1, // Breaking Bad
        season_id: 1, // Season 1
        no: 1,
        name: "Pilot",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        episode_id: 2,
        series_id: 1, // Breaking Bad
        season_id: 1, // Season 1
        no: 2,
        name: "Cat's in the Bag...",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        episode_id: 3,
        series_id: 2, // Game of Thrones
        season_id: 3, // Season 1
        no: 1,
        name: "Winter Is Coming",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        episode_id: 4,
        series_id: 2, // Game of Thrones
        season_id: 3, // Season 1
        no: 2,
        name: "The Kingsroad",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        episode_id: 5,
        series_id: 3, // Stranger Things
        season_id: 5, // Season 1
        no: 1,
        name: "Chapter One: The Vanishing of Will Byers",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        episode_id: 6,
        series_id: 3, // Stranger Things
        season_id: 5, // Season 1
        no: 2,
        name: "Chapter Two: The Weirdo on Maple Street",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("episodes", episodes);

  },

  down: async (queryInterface: any) => {
    await queryInterface.bulkDelete("episodes", null, {});
  },
};
