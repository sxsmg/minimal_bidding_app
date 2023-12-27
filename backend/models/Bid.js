const Sequelize = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Bid = sequelize.define('Bid', {
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Note: This should match the table name as Sequelize sees it
            key: 'id'
        }
    },
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

// If you're manually defining the foreign key, you might not need the following association
// Bid.belongsTo(User);

module.exports = Bid;
