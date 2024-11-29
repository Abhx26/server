import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';

const authenticate = async (req, res, next) => {
  try {
    // Extract bearer token from the authorization header
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    // Split the bearerHeader to extract the token
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];  // The actual token value

    //console.log("Received token:", token); // Log the received token

    // Verify the JWT token
    let verifyTokens;
    try {
      verifyTokens = jwt.verify(token, process.env.JWT_SECRET);
      //console.log("Decoded token:", verifyTokens); // Log decoded token to verify its structure
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).send("Unauthorized: Token expired");
      }
      console.error("Token verification error:", error);
      return res.status(401).send("Unauthorized: Invalid token");
    }

    // Ensure token has valid payload with _id
    if (!verifyTokens || !verifyTokens.id) {
      console.log("Token Verification Failed...");
      return res.status(401).send("Unauthorized: Invalid token payload");
    }else{
      //console.log("id: " ,verifyTokens.id);
      
      //console.log("Verification Successful")
    }

    // Find the user by ID in the MySQL database (Sequelize query)
    const user = await User.findOne({
      where: { id: verifyTokens.id },  // Ensure you're using the correct column name for ID
    });

    // If the user does not exist, return unauthorized
    if (!user) {
      return res.status(401).send("Unauthorized: User not found");
    }

    // Attach user data to the request object for future middleware/route handlers
    req.token = token;
    req.rootUser = user;
    req.userID = user.id;

    // Proceed to next middleware or route handler
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).send("Unauthorized: Invalid token or session expired");
  }
};

export default authenticate;
