import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../model/userSchema.js'; // Add the .js extension

import { Op } from 'sequelize'; 
// Register new user
const register = async (req, res, next) => {
  try {
    const { name, userType, adminKey, password, cpassword, email, department } = req.body;

    // If the user is trying to register as an admin
    if (userType === "admin") {
      if (!name || !adminKey || !password || !cpassword || !email) {
        return res.status(422).json({ error: "Kindly complete all fields." });
      }

      // Admin doesn't need further validation
      let user = await User.create({ name, userType: "admin", adminKey, password, cpassword, email });

      // Send email to the admin
      await sendAccountCreatedEmail(name, email);

      return res.status(201).json({ message: "Admin registered successfully", user });
    }

    // For non-admin users like director, hod, or others
    const hodExist = await User.findOne({ where: { userType: "hod" } });

    if (!name || !userType || !password || !cpassword || !email) {
      return res.status(422).json({ error: "Kindly complete all fields." });
    }

    if ((userType === "staff" || userType === "hod") && hodExist) {
      return res.status(422).json({ error: `HOD for ${department} already exists` });
    }

    // Regular expression to validate full name
    // const nameRegex = /^[\w'.]+\s[\w'.]+\s*[\w'.]*\s*[\w'.]*\s*[\w'.]*\s*[\w'.]*$/;
    // if (!nameRegex.test(name)) {
    //   return res.status(422).json({ error: "Kindly provide your complete name." });
    // }

    // Password length validation
    if (password.length < 7) {
      return res.status(422).json({ error: "Password must contain at least 7 characters." });
    }

    if (password !== cpassword) {
      return res.status(422).json({ error: "Password and confirm password do not match." });
    }

    // Check if the user already exists by email
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(422).json({ error: "Provided email id is associated with another account." });
    }

    // Create a user based on their userType
    let userTypeMapped = userType === "director" ? "faculty" : userType;
    const user = await User.create({ name, userType: userTypeMapped, adminKey: null, password, cpassword, email });

    // Send email to the user
    await sendAccountCreatedEmail(name, email,password,userType);

    return res.status(200).json({ message: "User registered successfully", user });

  } catch (error) {
    next(error);
  }
};

const facultyAccountCreatedEmail = (facultyName, facultyEmail, userType, password, institutionName = "The LNM Institute of Information Technology, Jaipur") => {
  return `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Account is Ready!</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', Arial, sans-serif;
            background-color: #F4F7FA;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            color: #2D3748;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #5B34D0 0%, #3A1078 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }

        .content {
            padding: 40px 30px;
            background-color: #FFFFFF;
        }

        .greeting {
            font-size: 22px;
            font-weight: 600;
            color: #2D3748;
            margin-bottom: 20px;
        }

        .details {
            background-color: #F9FAFB;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            border: 1px solid #E2E8F0;
        }

        .detail-item {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }

        .detail-label {
            font-weight: 600;
            color: #4A5568;
            width: 120px;
            flex-shrink: 0;
        }

        .detail-value {
            color: #2D3748;
            font-weight: 500;
        }

        .cta-button {
            display: block;
            width: 100%;
            background: linear-gradient(135deg, #5B34D0 0%, #3A1078 100%);
            color: white;
            text-align: center;
            padding: 15px 0;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: transform 0.2s;
        }

        .cta-button:hover {
            transform: translateY(-3px);
        }

        .footer {
            background-color: #F9FAFB;
            padding: 20px;
            text-align: center;
            color: #718096;
            font-size: 14px;
            border-top: 1px solid #E2E8F0;
        }

        .support-link {
            color: #5B34D0;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to ${institutionName}!</h1>
        </div>
        
        <div class="content">
            <div class="greeting">Hello, ${facultyName}</div>
            
            <p>Your account has been successfully created. Here are your login details:</p>
            
            <div class="details">
                <div class="detail-item">
                    <div class="detail-label">Email:</div>
                    <div class="detail-value">${facultyEmail}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">User Type:</div>
                    <div class="detail-value">${userType}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Password:</div>
                    <div class="detail-value">${password}</div>
                </div>
            </div>

            <a href="http://localhost:3000/login" class="cta-button">Access Your Account</a>

            <p style="margin-top: 20px; font-size: 16px; color: #2D3748;">
                For security purposes, we strongly recommend that you change your password immediately after your first login.
            </p>
        </div>

       
    </div>
</body>
</html>

`;
};


// Function to send account creation email
const sendAccountCreatedEmail = async (name, email,password,userType) => {
  try {
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can use other email services
      auth: {
        user: process.env.SENDER_EMAIL, // Your email
        pass: process.env.SENDER_PASSWORD, // Your email password or app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Account Created Successfully",
      html: facultyAccountCreatedEmail(name,email,userType,password)
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};




const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.SENDER_EMAIL,
    pass:process.env.SENDER_PASSWORD
  }
})

const resetPasswordTemplate = (resetLink, userName) => {
  console.log("Reset Link ", resetLink);
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Reset Request</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', Arial, sans-serif;
            background-color: #F4F7FA;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            color: #2D3748;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #5B34D0 0%, #3A1078 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }

        .content {
            padding: 40px 30px;
            background-color: #FFFFFF;
            text-align: center;
        }

        .greeting {
            font-size: 22px;
            font-weight: 600;
            color: #2D3748;
            margin-bottom: 20px;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #5B34D0 0%, #3A1078 100%);
            color: white !important;
            text-align: center;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: transform 0.2s;
            margin-top: 20px;
        }

        .cta-button:hover {
            transform: translateY(-3px);
        }

        .disclaimer {
            font-size: 14px;
            color: #718096;
            margin-top: 30px;
            padding: 0 20px;
        }

        .footer {
            background-color: #F9FAFB;
            padding: 20px;
            text-align: center;
            color: #718096;
            font-size: 14px;
            border-top: 1px solid #E2E8F0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        
        <div class="content">
            <div class="greeting">Hello ${userName},</div>
            
            <p style="font-size: 16px; color: #2D3748;">
                A request has been received to change the password for your account. 
                Click the button below to reset your password.
            </p>

            <a href="${resetLink}" class="cta-button">Reset Password</a>

            <div class="disclaimer">
                If you didn't request this, you can ignore this email. 
                Your password won't change until you create a new one.
            </div>
        </div>

        <div class="footer">
            <p>© 2024 Your Institution. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

  `;
};







 







const verifyEmailTemplate = (resetLink,userFind) => {
  return `
  

  <head>
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  <style>
    a,
    a:link,
    a:visited {
      text-decoration: none;
      color: #00788a;
    }
  
    a:hover {
      text-decoration: underline;
    }
  
    h2,
    h2 a,
    h2 a:visited,
    h3,
    h3 a,
    h3 a:visited,
    h4,
    h5,
    h6,
    .t_cht {
      color: #000 !important;
    }
  
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td {
      line-height: 100%;
    }
  
    .ExternalClass {
      width: 100%;
    }
  </style>
  </head>
  
  <body style="font-size: 1.25rem;font-family: 'Roboto', sans-serif;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px; background-color: #FAFAFA; width: 75%; max-width: 1280px; min-width: 600px; margin-right: auto; margin-left: auto">
  <table cellpadding="12" cellspacing="0" width="100%" bgcolor="#FAFAFA" style="border-collapse: collapse;margin: auto">

    <tbody>
    <tr>
      <td style="padding: 50px; background-color: #fff; max-width: 660px">
        <table width="100%" style="">
          <tr>
            <td style="text-align:center">
              <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello Admin</h1>
              <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">A new user has registered on our platform. Please review the user's details provided below and click the button below to verify the user.</p>
               <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">User Details</h1>
              <div style="text-align: justify; margin:20px; display: flex;">
                
                <div style="flex: 1; margin-right: 20px;">
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">Full Name :</h1>
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">Email :</h1>
                  
                </div>
                <div style="flex: 1;">
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${userFind.name}</h1>
                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${userFind.email}</h1>
                  
                
                </div>
              </div>
              
              <a href="http://${resetLink}" style="background-color: #4f46e5; color: #fff; padding: 8px 24px; border-radius: 8px; border-style: solid; border-color: #4f46e5; font-size: 14px; text-decoration: none; cursor: pointer">Verify User</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </tbody>

  </table>
  </body>


  `;
};

// Send reset password email
const passwordLink = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: "Please Enter your Email" });
    }

    // Find the user by email using Sequelize
    const userFind = await User.findOne({ where: { email } });

    if (userFind) {
      // Generate a token for password reset
      const token = jwt.sign({ _id: userFind.id }, process.env.JWT_SECRET, {
        expiresIn: "300s" // 5 minutes
      });

      // Update the user's verifyToken
      const setUserToken = await userFind.update({ verifyToken: token });

      if (setUserToken) {
        // Create reset password link
        const resetLink = `${process.env.CLIENT_URL}/forgotPassword/${userFind.id}/${setUserToken.verifyToken}`;
        console.log(resetLink);  // Logging the link for debugging

        // Send email with the reset link
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: "Book It Reset Password",
          html: resetPasswordTemplate(resetLink, userFind.name) // Customize the template if necessary
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return res.status(401).json({ status: 401, message: "Email not Sent" });
          } else {
            console.log("Email Sent", info.response);
            return res.status(201).json({ status: 201, message: "Email Sent Successfully" });
          }
        });
      }
    } else {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: 401, message: "Invalid User" });
    next(error);
  }
};

// Reset Password
// const resetPassword = async (req, res) => {
//   try {
//     const { password, cpassword } = req.body;
//     const { id } = req.params;

//     if (!password || !cpassword) {
//       return res.status(422).json({ error: 'Please provide password and confirm password' });
//     }

//     if (password !== cpassword) {
//       return res.status(422).json({ error: 'Passwords do not match' });
//     }

//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(422).json({ error: 'User not found' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     await user.update({ password: hashedPassword, cpassword: hashedPassword });
//     return res.status(200).json({ message: 'Password reset successful' });
//   } catch (error) {
//     return res.status(500).json({ error: 'Something went wrong' });
//   }
// };

// Forgot Password
const forgotPassword = async (req, res, next) => {
  const { id, token } = req.params;

  try {
    // Find user by ID and verifyToken
    const validUser = await User.findOne({
      where: {
        id, // Assuming 'id' is the primary key
        verifyToken: token, // Compare token with the stored verifyToken
      },
    });

    if (validUser) {
      // Verify the token
      try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        // If the token is valid and matches the user ID
        if (validUser.id === verifyToken._id) {
          return res.status(201).json({
            status: 201,
            validUser,
          });
        } else {
          return res.status(401).json({
            status: 401,
            message: 'User not exist or token is invalid',
          });
        }
      } catch (error) {
        return res.status(401).json({
          status: 401,
          message: 'Invalid token or token has expired',
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: 'User not found or token mismatch',
      });
    }
  } catch (error) {
    console.error('Error in forgotPassword:', error.message);
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
};

// Set New Password
const setNewPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password, cpassword } = req.body;

  try {
    // Validate password length
    if (password.length < 7) {
      return res.status(422).json({ error: 'Password must contain at least 7 characters' });
    }

    // Check if password and confirm password match
    if (password !== cpassword) {
      return res.status(422).json({ error: 'Password and confirm password do not match' });
    }

    // Find user by id and token
    const validUser = await User.findOne({
      where: {
        id,
        verifyToken: token,
      },
    });

    if (validUser) {
      try {
        // Verify the token
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        // If the user and token match
        if (validUser.id === verifyToken._id) {
          // Hash the new password
          // const newPassword = await bcrypt.hash(password, 12);

          // Update the user's password
          validUser.password = password;
          await validUser.save(); // Save the new password

          return res.status(201).json({
            status: 201,
            message: 'Password updated successfully',
          });
        } else {
          return res.status(401).json({
            status: 401,
            message: 'User not found or token mismatch',
          });
        }
      } catch (error) {
        return res.status(401).json({
          status: 401,
          message: 'Invalid or expired token',
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error('Error in setNewPassword:', error.message);
    return res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
};

// Send Email Verification Link
const emailVerificationLink = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Please Enter your Email" });
    }

    // Find the user by email using Sequelize
    const user = await User.findOne({ where: { email } });

    if (user) {
      // Generate JWT token
      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      // Update the user's verifyToken in the database using Sequelize
      user.verifyToken = token;
      await user.save();

      const resetLink = `${process.env.CLIENT_URL}/verifyEmail/${user.id}/${token}`;
      console.log(resetLink);

      // Send email to admin for verification
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.ADMIN_EMAIL,  // Send mail to admin to verify new user
        subject: "Book It User Verification",
        html: verifyEmailTemplate(resetLink, user)  // Assuming this is a function to generate HTML content
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(401).json({ status: 401, message: "Email not sent" });
        } else {
          return res.status(201).json({ status: 201, message: "Email sent successfully" });
        }
      });

    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ status: 401, message: "Invalid User" });
    next(error);
  }
};

// Verify Email
const verifyEmail = async (req, res, next) => {
  const { id, token } = req.params;
  console.log(id); // Log the user ID for debugging
  console.log(token); // Log the token for debugging

  try {
    // Find the user by ID using Sequelize
    const validUser = await User.findOne({ where: { id } });

    // Check if user exists
    if (!validUser) {
      return res.status(404).json({ status: 404, error: "User not found" });
    }
    console.log("User Fetched", validUser); // Log the fetched user for debugging

    // Verify the token using JWT
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifyToken); // Log the verified token for debugging

    // Check if the token is valid and matches the user's ID
    if (validUser.id === verifyToken._id) {
      // Update the user's emailVerified field
      await validUser.update({ emailVerified: true });

      // Return a success message
      res.status(201).json({ status: 201, message: "User verified successfully" });
    } else {
      // If the user ID doesn't match the token, send an error
      res.status(401).json({ status: 401, error: "Invalid verification link" });
    }
  } catch (error) {
    // Handle any errors (e.g., token verification failure)
    console.error(error);
    next(error);
  }
};


// Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide both email and password." });
    }

    const userLogin = await User.findOne({ where: { email } });

    if (!userLogin) {
      return res.status(400).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      console.log('pass-',password)
      console.log('user-',userLogin.password)
      return res.status(400).json({ error: "Invalid password." });
    }

    const token = jwt.sign({ id: userLogin.id }, process.env.JWT_SECRET, { expiresIn: '2d' });

    res.cookie("jwtoken", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only secure in production
      sameSite: 'strict',
    });

    return res.status(200).json({
      userLogin: { id: userLogin.id, email: userLogin.email,userType:userLogin.userType}, // Minimal user data
      token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong, please try again.' });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.rootUser.id;
    const { name } = req.body;

    // Validate input
    if (!name || !name.trim()) {
      return res.status(422).json({ error: "Name is required." });
    }

    // Regex for validation
    const nameRegex = /^[A-Za-z][A-Za-z'.\s]*$/;
    if (!nameRegex.test(name)) {
      return res.status(422).json({ error: "Invalid name format." });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update the user
    const updatedCount = await User.update(
      { name },
      { where: { id: userId } }
    );
    console.log("Updated Count:", updatedCount);

    if (updatedCount[0] === 1) {
      const updatedUser = await User.findByPk(userId);
      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } else {
      res.status(400).json({ error: "No changes were made to the profile." });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};



// Contact
const contact = async (req, res, next) => {
  try {
    // Extract fields from the request body
    const { name, email, department, phone, message } = req.body;

    // Check if all required fields are present
    if (!name || !department || !email || !phone || !message) {
      return res.status(400).json({ error: "Please fill out the form correctly" });
    }

    // Find the user by ID (assuming req.userID contains the authenticated user's ID)
    const user = await User.findByPk(req.userID); // Using `findByPk` for Sequelize

    if (user) {
      // Create a new message associated with the user
      const newMessage = await Message.create({
        name,
        email,
        department,
        phone,
        message,
        userId: user.id // Assuming the foreign key to link messages with users
      });

      res.status(201).json({ message: "Message created successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};
// Logout
const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

// Delete Faculty
const deleteFaculty = async (req, res) => {
  const { facultyId } = req.params; // Match the route parameter name

  try {
    const user = await User.findByPk(facultyId); // Find user by facultyId
    if (!user) {
      return res.status(404).json({ error: 'Faculty member not found' });
    }

    await user.destroy(); // Delete the user
    res.status(200).json({ success: true, message: 'Faculty member deleted successfully' });
  } catch (error) {
    console.error("Error deleting faculty:", error.message);
    res.status(500).json({ error: 'Failed to delete faculty due to a server error.' });
  }
};


// Get All Instructors


const getAllInstructor = async (req, res) => {
  try {
    console.log("Inside getAllInstructors");

    // Exclude the current user and any user with userType 'admin'
    const faculties = await User.findAll({
      where: {
        userType: {
          [Op.ne]: 'admin', // Sequelize equivalent for MongoDB's $ne operator
        },
      },
    });

    if (faculties.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No instructors found",
      });
    }

    console.log("Fetched all instructors successfully");
    return res.status(200).json({
      success: true,
      message: "All users fetched",
      faculties,
    });
  } catch (err) {
    console.error("Error in getAllInstructors:", err.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching user data",
    });
  }
};



// About page (Root user)
const about = async (req, res) => {
  res.send(req.rootUser);
};

// Get data (For contact us and home page)
const getdata = async (req, res) => {
  res.send(req.rootUser);
};

export default {
  register,
  passwordLink,
  forgotPassword,
  setNewPassword,
  emailVerificationLink,
  verifyEmail,
  login,
  updateProfile,
  contact,
  logout,
  deleteFaculty,
  getAllInstructor,
  about,
  getdata
};
