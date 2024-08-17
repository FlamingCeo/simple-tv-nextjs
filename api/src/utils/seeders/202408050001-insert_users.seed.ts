import bcrypt from "bcrypt";

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    const password = "12345678";
    const hashedPassword = await bcrypt.hash(password, 12); // Generate hash for the password
    const users: any[] = [
      {
        user_id: 2,
        email: "admin@test.com",
        password: hashedPassword,
        createdAt: "2024-08-05T08:13:01.686Z",
        updatedAt: "2024-08-05T08:13:01.686Z",
      },
      {
        user_id: 3,
        email: "cust1@test.com",
        password: hashedPassword,
        createdAt: "2024-08-05T08:13:01.686Z",
        updatedAt: "2024-08-05T08:13:01.686Z",
      },
      {
        user_id: 4,
        email: "cust2@test.com",
        password: hashedPassword,
        createdAt: "2024-08-05T08:13:01.686Z",
        updatedAt: "2024-08-05T08:13:01.686Z",
      },
    ];
    await queryInterface.bulkInsert("users", users);
  },

  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
