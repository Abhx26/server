
import bcrypt from "bcrypt"

const password = 'admin123'; // Plain text password
const hashedPassword =  await bcrypt.hash(password, 12);
console.log(hashedPassword);
