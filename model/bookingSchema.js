import { DataTypes } from 'sequelize';
import db from '../DB/conn.js';
const { sequelize } = db;
import User from './userSchema.js';
import Hall from './hallSchema.js';

const Booking = sequelize.define('Booking', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    }
  },
  day: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eventManager: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  eventDateType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventStartDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  eventEndDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
 startTime: {
        type: DataTypes.TIME, 
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME, 
        allowNull: false,
      },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bookedHallId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Hall,
      key: 'id',
    }
  },
  bookedHallDetails: {  // Renamed the attribute here
    type: DataTypes.JSON,
    allowNull: true,
  },
  bookedHallName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizingClub: {
    type: DataTypes.TEXT,
    allowNull: true,
     
  },
  phoneNumber: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  altNumber: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  rejectionReason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isApproved: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Request Sent",
  }
}, {
  timestamps: true,
  tableName: 'bookings',
});

// Associations with User and Hall
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Booking.belongsTo(Hall, { foreignKey: 'bookedHallId', as: 'bookedHall' }); // No conflict with the attribute

export default Booking;
