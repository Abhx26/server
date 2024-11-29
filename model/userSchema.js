import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../DB/conn.js';
const { sequelize } = db;

// Define the User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true, // Ensures that email is unique
  },
  phone: {
    type: DataTypes.BIGINT, // Use BIGINT for phone numbers
    allowNull: true, // Phone number is optional
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminKey: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Defaults to the current time
  },
  tokens: {
    type: DataTypes.JSON, // Store tokens as an array of objects in JSON format
    allowNull: true,
  },
  verifyToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Defaults to false for emailVerified
  },
}, {
  timestamps: false, // Since the `date` field serves as a timestamp, we don't need Sequelize to handle `createdAt`/`updatedAt`
});

// Password Hashing - before creating the user
User.beforeSave(async (user, options) => {
  if (user.password && user.changed('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    user.cpassword = hashedPassword; // Assuming cpassword needs to be hashed as well
  }
});

// Method to generate JWT
User.prototype.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET, { expiresIn: '2d' });
    this.tokens = this.tokens ? [...this.tokens, { token }] : [{ token }];
    await this.save();
    return token;
  } catch (error) {
    throw new Error('Could not generate token');
  }
};

export default User;
