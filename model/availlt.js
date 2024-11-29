const { DataTypes } = require('sequelize');
const { sequelize } = require('../DB/conn'); // Adjust the path to your db configuration
const User = require('./User'); // Assuming User model is in the same folder
const Hall = require('./Hall'); // Assuming Hall model is in the same folder

const AvailableLT = sequelize.define('AvailableLT', {
    userId: {
        type: DataTypes.INTEGER,  // User ID will be a foreign key, assuming `id` is INTEGER
        allowNull: false, // Required field
        references: {
            model: User, // This refers to the 'User' model
            key: 'id',   // The primary key in the 'User' table
        }
    },
    eventManager: {
        type: DataTypes.STRING,
        allowNull: false, // Required field
    },
    eventName: {
        type: DataTypes.STRING,
        allowNull: false, // Required field
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: true, // Optional field
    },
    eventDateType: {
        type: DataTypes.STRING,
        allowNull: false, // Required field
    },
    eventStartDate: {
        type: DataTypes.DATE,
        allowNull: true, // Optional field
    },
    eventEndDate: {
        type: DataTypes.DATE,
        allowNull: true, // Optional field
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: true, // Optional field
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: true, // Optional field
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // Required field
    },
    bookedHallId: {
        type: DataTypes.INTEGER,  // Hall ID will be a foreign key, assuming `id` is INTEGER
        allowNull: false, // Required field
        references: {
            model: Hall, // Refers to the 'Hall' model
            key: 'id',  // The primary key in the 'Hall' table
        }
    },
    bookedHall: {
        type: DataTypes.JSONB,  // Use JSONB to store the hall details (if necessary)
        allowNull: false, // Required field
    },
    bookedHallName: {
        type: DataTypes.STRING,
        allowNull: false, // Required field
    },
    organizingClub: {
        type: DataTypes.STRING,
        allowNull: false, // Required field
    },
    phoneNumber: {
        type: DataTypes.BIGINT,  // Use BIGINT for phone numbers
        allowNull: false, // Required field
    },
    altNumber: {
        type: DataTypes.BIGINT,
        allowNull: true, // Optional field
    },
    rejectionReason: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
    },
    isApproved: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Request Sent",  // Default value is set to "Request Sent"
    }
}, {
    // Model options
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
    tableName: 'available_lts', // Define the custom table name
});

// Associations with User and Hall
AvailableLT.belongsTo(User, { foreignKey: 'userId' });  // AvailableLT belongs to User (1:1 relationship)
AvailableLT.belongsTo(Hall, { foreignKey: 'bookedHallId' });  // AvailableLT belongs to Hall (1:1 relationship)

module.exports = AvailableLT;
