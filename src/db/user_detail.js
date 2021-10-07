module.exports = (sequelize, Sequelize) => {
  const user_detail = sequelize.define(
    "user_detail",
    {
      userId: {
        type: Sequelize.TEXT,
      },

      charges_enable: {
        type: Sequelize.STRING,
        // defaultValue: 0,
      },

      payouts_enabled: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  );
  return user_detail;
};
