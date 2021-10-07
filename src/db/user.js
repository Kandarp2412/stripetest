module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
      userId: {
        type: Sequelize.TEXT,
      },

      connectedId: {
        type: Sequelize.TEXT,
        defaultValue: 0,
      },
      charges: {
        type: Sequelize.STRING,
        defaultValue: "0",
      },
      payouts: {
        type: Sequelize.STRING,
        defaultValue: "0",
      },
    },
    { timestamps: false }
  );
  return user;
};
