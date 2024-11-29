import Booking from '../model/bookingSchema.js';   // Assuming you have the .js extension
import Hall from '../model/hallSchema.js';           // Assuming you have the .js extension
import User from '../model/userSchema.js';           // Assuming you have the .js extension
import nodemailer from "nodemailer";                 // Third-party module
import xlsx from 'xlsx';                            // Third-party module
import { parseISO } from 'date-fns';  
import { Sequelize,Op } from 'sequelize';



 // transporter for sending email
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.SENDER_EMAIL,
    pass:process.env.SENDER_PASSWORD
  }
})

// const generateBookingEmailTemplate = (eventName, bookedHallName, organizingClub, institution, department, bookingId,eventDate) => {
//   // return `


//   // <head>
//   // <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
//   // <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
//   // <style>
//   //   a,
//   //   a:link,
//   //   a:visited {
//   //     text-decoration: none;
//   //     color: #00788a;
//   //   }
  
//   //   a:hover {
//   //     text-decoration: underline;
//   //   }
  
//   //   h2,
//   //   h2 a,
//   //   h2 a:visited,
//   //   h3,
//   //   h3 a,
//   //   h3 a:visited,
//   //   h4,
//   //   h5,
//   //   h6,
//   //   .t_cht {
//   //     color: #000 !important;
//   //   }
  
//   //   .ExternalClass p,
//   //   .ExternalClass span,
//   //   .ExternalClass font,
//   //   .ExternalClass td {
//   //     line-height: 100%;
//   //   }
  
//   //   .ExternalClass {
//   //     width: 100%;
//   //   }
//   // </style>
//   // </head>
  
//   // <body style="font-size: 1.25rem;font-family: 'Roboto', sans-serif;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px; background-color: #FAFAFA; width: 75%; max-width: 1280px; min-width: 600px; margin-right: auto; margin-left: auto">
//   // <table cellpadding="12" cellspacing="0" width="100%" bgcolor="#FAFAFA" style="border-collapse: collapse;margin: auto">

//   //   <tbody>
//   //   <tr>
//   //     <td style="padding: 50px; background-color: #fff; max-width: 660px">
//   //       <table width="100%" style="">
//   //         <tr>
//   //           <td style="text-align:center">
//   //           <h1 style="font-size: 30px; color: #4f46e5; margin-top: 0;">New Booking Request</h1> 
//   //           <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello Admin</h1>
//   //             <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">A new booking has been requested on our platform. Please review the booking details provided below and click the button to view the booking.</p>
//   //              <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
//   //             <div style="text-align: justify; margin:20px; display: flex;">
                
//   //               <div style="flex: 1; margin-right: 20px;">
//   //                 <h1 style="font-size: 20px; color: #202225; margin-top: 0;">EVENT NAME	 :</h1>
//   //                 <h1 style="font-size: 20px; color: #202225; margin-top: 0;">HALL NAME	 :</h1>
//   //                 <h1 style="font-size: 20px; color: #202225; margin-top: 0;">EVENTDATE :</h1>
                      
                 
//   //               </div>
//   //               <div style="flex: 1;">
//   //                 <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${eventName}</h1>
//   //                 <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${bookedHallName}</h1>
//   //                  <h1 style="font-size: 20px; color: #202225; margin-top: 0;">${eventDate}</h1>
                  
              
//   //               </div>
//   //             </div>
              
//   //             <a href="http://${process.env.CLIENT_URL}/bookingsView/${bookingId}" style="background-color: #4f46e5; color: #fff; padding: 8px 24px; border-radius: 8px; border-style: solid; border-color: #4f46e5; font-size: 14px; text-decoration: none; cursor: pointer">View Booking</a>
//   //           </td>
//   //         </tr>
//   //       </table>
//   //     </td>
//   //   </tr>
//   // </tbody>

//   // </table>
//   // </body>


//   // `;

//   <!DOCTYPE html>
// <html>
//    <head>
//       <title>The LNM Institute of Information Technology, Jaipur</title>
// <link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">
//    </head>
//    <body>
//       <table style="background:#eee;padding:40px;border:1px solid #ddd;margin:0 auto; font-family: 'Roboto', sans-serif;">
//          <tbody>
//             <tr>
//                <td>
//                   <table style="background:#fff;width:100%;border:1px solid #ccc;padding:0;margin:0;border-collapse:collapse;max-width:100%;width:550px;border-radius:10px">
//                      <tbody style="border: solid 1px #034da2;">
//                         <tr style="background: #EEEEEE;">                          
//                            <td>
//                               <center><a href="https://lnmiit.ac.in"><img src="<?php echo base_url();?>images/LNMIIT_logo.png" style="width:200px; margin:auto;display:block; padding: 10px;"></a></center>                
//                            </td>
//                         </tr>  
//                         <tr>
//                            <td style="padding:10px 30px;text-align:center;margin:0">
//                            </td>
//                         </tr>                      
//                         <tr>
//                            <td style="padding:10px 30px;margin:0;text-align:left; font-family: 'Roboto', sans-serif; font-size: 14px;">
//                               <p>Dear <b>User</b>, </p>
//                               <p>To ensure the security and authenticity of your email account, we are implementing an additional verification step. Please find below your One-Time Password (OTP) for verification:</p>
                             
//                               <p>OTP Code:</p>
//                               <h3><?php echo $emailOTP;?></h3>
//                            </td>
//                         </tr>
//                         <tr>
//                            <td style="padding:10px 30px;margin:0;text-align:left; font-family: 'Roboto', sans-serif; font-size: 14px;">
//                               <p>Please enter this OTP on the verification page to complete the authentication process. If you did not initiate this request, please contact our support team immediately.</p>
//                               <p>Thank you for your cooperation in maintaining the security of your account.</p>
//                               <br/><br/>
//                               <p>Best regards,</p>
//                               <p><b>Webmaster LNMIIT</b></p>
//                               <p>webmaster@lnmiit.ac.in</p>
//                            </td>
//                         </tr>
//                      </tbody>
//                   </table>
//                </td>
//             </tr>
//          </tbody>
//       </table>
//    </body>
// </html>
// };
const generateBookingEmailTemplate = (
  eventName,
  bookedHallName,
  description,
  eventDate,
  eventManager,
  bookingId,
  userType
) => {
  const approvalNote =
    userType === "student"
      ? "As this is a student request, admin approval is required."
      : "This request has been automatically approved as it is from faculty.";
  const highlightText =
    userType === "student"
      ? "Please review this booking request at your earliest convenience."
      : "No further action is required as the request is already approved.";

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>New Booking Request</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
      <style>
        /* General Styles */
        body {
          font-family: 'Inter', Arial, sans-serif;
          background-color: #F0F4F8;
          margin: 0;
          padding: 20px;
          color: #1a1a1a;
          line-height: 1.6;
        }

        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #034da2 0%, #0056b8 100%);
          color: white;
          text-align: left;
          padding: 40px 30px;
          border-bottom: 5px solid #FFD700;
        }

        h1 {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 15px 0;
          color: #ffffff;
        }

        .header p {
          font-size: 16px;
          margin: 0;
          opacity: 0.95;
          color: #E8F0FE;
        }

        .content {
          padding: 30px;
          background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%);
        }

        .details {
          background-color: #FFFFFF;
          border: 1px solid #E1E8F5;
          border-radius: 12px;
          padding: 25px;
          margin: 20px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .detail-row {
          margin-bottom: 20px;
          border-bottom: 1px solid #E1E8F5;
          padding-bottom: 15px;
        }

        .detail-row:last-child {
          margin-bottom: 0;
          border-bottom: none;
          padding-bottom: 0;
        }

        .detail-label {
          font-size: 14px;
          color: #034da2;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .detail-value {
          font-size: 16px;
          color: #2D3748;
          font-weight: 500;
        }

        .description {
          background-color: #F8FAFF;
          padding: 15px;
          border-radius: 8px;
          margin-top: 5px;
          border: 1px solid #E1E8F5;
          color: #2D3748;
          line-height: 1.6;
        }

        .highlight-box {
          background: linear-gradient(135deg, #F8FAFF 0%, #E8F0FE 100%);
          border-left: 4px solid #034da2;
          padding: 15px;
          margin-top: 20px;
          border-radius: 0 8px 8px 0;
        }

        .button {
          display: inline-block;
          background: linear-gradient(135deg, #034da2 0%, #0056b8 100%);
          padding: 16px 32px;
          text-align: center;
          text-decoration: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          margin: 25px 0;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(3, 77, 162, 0.2);
          color: #ffffff !important;
          width: 100%;
          box-sizing: border-box;
        }

        .footer {
          text-align: center;
          padding: 30px;
          background-color: #F8FAFF;
          border-top: 1px solid #E1E8F5;
        }

        .footer p {
          margin: 0;
          color: #5A6C87;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Booking Request</h1>
          <p>A new venue booking request has been submitted for your review.</p>
        </div>

        <div class="content">
          <div class="details">
            <div class="detail-row">
              <div class="detail-label">Event Name</div>
              <div class="detail-value">${eventName}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Venue</div>
              <div class="detail-value">${bookedHallName}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Date</div>
              <div class="detail-value">${eventDate}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Description</div>
              <div class="description">${description}</div>
            </div>

            <div class="detail-row">
              <div class="detail-label">Created By</div>
              <div class="detail-value">${eventManager} (${userType})</div>
            </div>
          </div>

          <div class="highlight-box">
            ${highlightText}
          </div>
          ${
            userType === "student"
              ? `<a href="http://${process.env.CLIENT_URL}/bookingsView/${bookingId}" class="button">
                  <span>Review Booking Request</span>
                </a>`
              : ""
          }
        </div>

        <div class="footer">
          <p>This is an automated message from the ${process.env.INSTITUTION_NAME} Venue Booking System.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};



const generateBookingEmailTemplateforOther = (eventName, bookedHallName, description, eventDate, eventManager,bookingId) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>New Booking Request</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
      <style>
        /* General Styles */
        body {
          font-family: 'Inter', Arial, sans-serif;
          background-color: #F0F4F8;
          margin: 0;
          padding: 20px;
          color: #1a1a1a;
          line-height: 1.6;
        }

        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #034da2 0%, #0056b8 100%);
          color: white;
          text-align: left;
          padding: 40px 30px;
          border-bottom: 5px solid #FFD700;
        }

        .logo {
          margin-bottom: 25px;
        }

        .logo img {
          height: 40px;
        }

        h1 {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 15px 0;
          color: #ffffff;
        }

        .header p {
          font-size: 16px;
          margin: 0;
          opacity: 0.95;
          color: #E8F0FE;
        }

        .content {
          padding: 30px;
          background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%);
        }

        .details {
          background-color: #FFFFFF;
          border: 1px solid #E1E8F5;
          border-radius: 12px;
          padding: 25px;
          margin: 20px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .detail-row {
          margin-bottom: 20px;
          border-bottom: 1px solid #E1E8F5;
          padding-bottom: 15px;
        }

        .detail-row:last-child {
          margin-bottom: 0;
          border-bottom: none;
          padding-bottom: 0;
        }

        .detail-label {
          font-size: 14px;
          color: #034da2;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .detail-value {
          font-size: 16px;
          color: #2D3748;
          font-weight: 500;
        }

        .description {
          background-color: #F8FAFF;
          padding: 15px;
          border-radius: 8px;
          margin-top: 5px;
          border: 1px solid #E1E8F5;
          color: #2D3748;
          line-height: 1.6;
        }

        .button {
          display: inline-block;
          background: linear-gradient(135deg, #034da2 0%, #0056b8 100%);
          padding: 16px 32px;
          text-align: center;
          text-decoration: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          margin: 25px 0;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(3, 77, 162, 0.2);
          color: #ffffff !important;
          width: 100%;
          box-sizing: border-box;
        }

        .button:hover {
          background: linear-gradient(135deg, #0056b8 0%, #034da2 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(3, 77, 162, 0.25);
          color: #ffffff !important;
        }

        .button span {
          color: #ffffff !important;
        }

        .footer {
          text-align: center;
          padding: 30px;
          background-color: #F8FAFF;
          border-top: 1px solid #E1E8F5;
        }

        .footer p {
          margin: 0;
          color: #5A6C87;
          font-size: 14px;
        }

        /* Status Badge */
        .status-badge {
          display: inline-block;
          background-color: #FFD700;
          color: #034da2;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          margin-top: 15px;
          box-shadow: 0 2px 6px rgba(255, 215, 0, 0.3);
        }

        /* Highlight Box */
        .highlight-box {
          background: linear-gradient(135deg, #F8FAFF 0%, #E8F0FE 100%);
          border-left: 4px solid #034da2;
          padding: 15px;
          margin-top: 20px;
          border-radius: 0 8px 8px 0;
        }

        /* Responsive Design */
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }

          .header {
            padding: 30px 20px;
          }

          .content {
            padding: 20px;
          }

          .details {
            padding: 15px;
          }

          .button {
            display: block;
            text-align: center;
            padding: 14px 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          
          <h1>New Booking Request</h1>
          <p>A new venue booking request has been submitted for your review.</p>
          <div class="status-badge">Pending Review</div>
        </div>

        <div class="content">
          <div class="details">
            <div class="detail-row">
              <div class="detail-label">Event Name</div>
              <div class="detail-value">${eventName}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Venue</div>
              <div class="detail-value">${bookedHallName}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Date</div>
              <div class="detail-value">${eventDate}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Description</div>
              <div class="description">${description}</div>
            </div>

            <div class="detail-row">
              <div class="detail-label">Name</div>
              <div class="description">${eventManager}</div>
            </div>
          </div>

          <div class="highlight-box">
            Please review this booking request at your earliest convenience.
          </div>

          <a href="http://${process.env.CLIENT_URL}/bookingsView/${bookingId}" class="button">
            <span>Review Booking Request</span>
          </a>
        </div>

        <div class="footer">
          <p>This is an automated message from the ${process.env.INSTITUTION_NAME} Venue Booking System.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};




const parseExcelDate = (excelDate) => {
  if (typeof excelDate === "number") {
    const epoch = new Date(1899, 11, 30); // Excel epoch starts on 1899-12-30
    const days = Math.floor(excelDate);
    const milliseconds = days * 24 * 60 * 60 * 1000;
    const result = new Date(epoch.getTime() + milliseconds);

    // Ensure the result is interpreted as a date without timezone shifts
    return new Date(result.toISOString().split("T")[0]);
  }

  // Handle string dates
  const date = new Date(excelDate);
  if (isNaN(date)) {
    throw new Error(`Invalid date format: ${excelDate}`);
  }
  return date;
};

const parseTime = (timeValue) => {
  if (typeof timeValue === "number") {
    // Convert fraction of a day to HH:mm:ss format
    const totalMinutes = timeValue * 24 * 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = Math.round((totalMinutes % 1) * 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  // If time is a string, ensure it is in HH:mm:ss format
  if (typeof timeValue === "string") {
    const [hours, minutes, seconds = "00"] = timeValue.split(":").map((value) => value.trim());
    if (!hours || !minutes) {
      throw new Error(`Invalid time format: ${timeValue}`);
    }
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  }

  console.error(`Invalid time input: ${timeValue}`);
  throw new Error(`Invalid time format: ${timeValue}`);
};

const upload = async (req, res, next) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ success: false, message: "No file uploaded." });
  }

  try {
    const file = req.files.file;

    // Validate file format
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      return res.status(400).json({ success: false, message: "Invalid file format. Please upload an Excel file." });
    }

    // Read the Excel file
    const workbook = xlsx.read(file.data, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

 

    const validBookings = [];

    for (const row of data) {
      try {
        // Parse and validate dates
        const eventStartDate = parseExcelDate(row["start date"]);
        const eventEndDate = parseExcelDate(row["end date"]);
        const startTimeRaw = row["start_time"];
        const endTimeRaw = row["end_time"];

        if (!eventStartDate || !eventEndDate || !startTimeRaw || !endTimeRaw) {
          console.warn("Skipping row: Invalid date or time", row);
          continue;
        }

        const startTime = parseTime(startTimeRaw);
        const endTime = parseTime(endTimeRaw);

        // Check if hall exists
        const hall = await Hall.findOne({ where: { name: row["Lt_name"] } });
        if (!hall) {
          console.warn(`Skipping row: No hall found for Lt_name ${row["Lt_name"]}`);
          continue;
        }

        // Create booking object
        const bookingData = {
          day: row["day"],
          eventManager: row["teacher_name"],
          designation: row["designation"],
          eventName: row["course"],
          department: row["Branch"],
          batch: row["Batch"],
          eventDateType: "multiple",
          eventStartDate,
          eventEndDate,
          startTime,
          endTime,
          bookedHallName: hall.name,
          bookedHallId: hall.id,
          isApproved: "Approved By Admin",
        };

        // Create booking in the database
        const createdBooking = await Booking.create(bookingData);
        validBookings.push(createdBooking);
      } catch (error) {
        console.error("Error processing row:", row, error);
      }
    }

    // Handle response when no valid bookings are found
    if (validBookings.length === 0) {
      return res.status(200).json({ success: true, message: "No valid bookings found.", data: [] });
    }

    return res.status(200).json({ success: true, message: "Bookings added successfully.", data: validBookings });
  } catch (error) {
    console.error("Error during file processing:", error);
    return res.status(500).json({ success: false, message: "Something went wrong while processing the file." });
  }
};










// Function to validate and format the time
const validateAndFormatTime = (time) => {
  if (!time) return null; // Handle null or undefined inputs
  

  // Check if input is an ISO string (e.g., "2000-01-01T09:00:00.000Z")
  const isoTimeRegex = /^\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2}):\d{2}\.\d{3}Z$/;
  const isoMatch = time.match(isoTimeRegex);
  if (isoMatch) {
      const [, hours, minutes] = isoMatch;
      return `${hours}:${minutes}`; // Return in HH:mm format
  }

  // Check if input includes AM/PM and convert to 24-hour format
  const amPmRegex = /^(\d{1,2}):(\d{2})(am|pm)$/i;
  const amPmMatch = time.match(amPmRegex);
  if (amPmMatch) {
      let [_, hours, minutes, meridian] = amPmMatch;
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);
      if (meridian.toLowerCase() === "pm" && hours !== 12) hours += 12;
      else if (meridian.toLowerCase() === "am" && hours === 12) hours = 0;
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  // Validate if already in 24-hour HH:mm format
  const timeRegex = /^([01]?\d|2[0-3]):[0-5]\d$/;
  if (timeRegex.test(time)) {
      return time.padStart(5, "0"); // Ensure HH:mm format
  }

  console.error("Invalid time format:", time);
  return null;
};
const combineDateAndTime = (date, time) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const combinedDate = new Date(date);
  combinedDate.setHours(hours, minutes, seconds || 0, 0);
  return combinedDate;
};






// Modify the createBooking function with the validateAndFormatTime
const createBooking = async (req, res, next) => {
  try {
    const {
      userId,
      eventManager,
      department,
      institution,
      eventName,
      eventDateType,
      eventDate,
      eventStartDate,
      eventEndDate,
      startTime,
      endTime,
      email,
      bookedHallId,
      bookedHallName,
      organizingClub,
      altNumber,
      isApproved,
    } = req.body;

    // Validate and format startTime and endTime using validateAndFormatTime
    const validStartTime = validateAndFormatTime(startTime);
    const validEndTime = validateAndFormatTime(endTime);

    // console.log(`[DEBUG] Valid Start Time: ${validStartTime}`);
    // console.log(`[DEBUG] Valid End Time: ${validEndTime}`);

    if (!validStartTime || !validEndTime) {
      return res.status(422).json({ error: 'Invalid start or end time format' });
    }

    // Format start and end times to local time
    const startDateTime = new Date(`2000-01-01T${validStartTime}:00`);
    const endDateTime = new Date(`2000-01-01T${validEndTime}:00`);

    // Ensure start and end times are stored in MySQL's DATETIME-compatible format
    const startFormatted = `${startDateTime.getHours().toString().padStart(2, '0')}:${startDateTime
    .getMinutes()
    .toString()
    .padStart(2, '0')}:00`;
  
  const endFormatted = `${endDateTime.getHours().toString().padStart(2, '0')}:${endDateTime
    .getMinutes()
    .toString()
    .padStart(2, '0')}:00`;

    // console.log(`[DEBUG] Final Start Time (Local): ${startFormatted}`);
    // console.log(`[DEBUG] Final End Time (Local): ${endFormatted}`);

    // Validate time range
    if (endDateTime <= startDateTime) {
      return res.status(422).json({ error: 'End time should be after start time' });
    }

    // Validate event manager name format
    const nameRegex = /^[\w'.]+\s[\w'.]+/;
    if (!nameRegex.test(eventManager)) {
      return res.status(422).json({ error: "Please enter your full Event Manager name" });
    }

    // Validate hall and user existence
    const hall = await Hall.findByPk(bookedHallId);
    if (!hall) {
      return res.status(422).json({ error: "Hall not found" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(422).json({ error: "User not found" });
    }

    // Determine approval state based on user type
    let approvedState = "Request Sent";
    if (user.userType === "faculty"||user.userType === "staff") {
      approvedState = "Approved By Admin";
    }

    // Handle optional altNumber (set to null if empty)
    const validatedAltNumber = altNumber && altNumber.trim() !== '' ? altNumber : null;

    // Validate eventDateType-specific fields
    if (eventDateType === "full" && !eventDate) {
      return res.status(422).json({ error: "Please provide event date for full day event" });
    } else if (eventDateType === "half" && (!startTime || !endTime || !eventDate)) {
      return res.status(422).json({ error: "Please provide all details for half day event" });
    } else if (eventDateType === "multiple") {
      const startDate = new Date(eventStartDate);
      const endDate = new Date(eventEndDate);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(422).json({ error: "Invalid start or end date for multiple day event" });
      }
      if (endDate <= startDate) {
        return res.status(422).json({ error: "End date should be after start date for multiple day event" });
      }
    }

    // Create booking record
    const booking = new Booking({
      userId: user.id,
      institution,
      department,
      eventManager,
      eventName,
      eventDateType,
      eventDate,
      startTime: startFormatted,
      endTime: endFormatted,
      email,
      bookedHallId: hall.id,
      bookedHallName,
      organizingClub,
      altNumber: validatedAltNumber,
      isApproved: approvedState,
    });

    //console.log("UserName: ", user.name);

    // Save booking to database
    await booking.save();

    console.log("[INFO] Booking saved successfully!");

    // Send notification email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: hall.hallCreater, // Send to hall creator
      subject: "New Booking Request",
      html: generateBookingEmailTemplate(
        eventName,
        bookedHallName,
        organizingClub,
        eventDate,
        eventManager,
        booking.id,
        user.userType
      ),
    };

    console.log("Event Manager",booking.eventManager);
    console.log("is approvedhgdhgdhgflhsgflhajfnhasvhsjfasjfvans;kf",booking.isApproved);
    var mailOptions2;
    if(booking.isApproved!=='Approved By Admin'){
    mailOptions2 = {
      from: process.env.SENDER_EMAIL,
      to: email, // Send to hall creator
      subject: "Booking Created Successfully",
      html: generateBookingEmailTemplateforOther(
        eventName,
        bookedHallName,
        organizingClub,
        eventDate,
        eventManager,
        booking.id
      ),
    };
  }
  else{
    mailOptions2 = {
      from: process.env.SENDER_EMAIL,
      to: email, // Send to hall creator
      subject: "Booking Created Successfully",
      html: sendApprovalEmailTemplate(
        eventName,
        bookedHallName,
        organizingClub,
        eventDate,
        eventManager,
        booking.id
      ),
    };
  }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("[ERROR] Email sending failed:", error);
      } else {
        console.log("[INFO] Email sent:", info.response);
      }
    });

    transporter.sendMail(mailOptions2, (error, info) => {
      if (error) {
        console.error("[ERROR] Email sending failed:", error);
      } else {
        console.log("[INFO] Email sent:", info.response);
      }
    });

    // Respond with success
    res.status(201).json({ message: "Booking created successfully" });

  } catch (error) {
    console.error("[ERROR] Error creating booking:", error.message);
    next(error);
  }
};















const getEvents = async (req, res, next) => {
  try {
    const currentDate = new Date(); // Current date to compare with event date

    // Find bookings where 'isApproved' is 'Approved By Admin' and eventDateType is not 'multiple'
    const bookings = await Booking.findAll({
      where: {
        isApproved: "Approved By Admin",
        eventDateType: { [Sequelize.Op.ne]: "multiple" }, // Exclude 'multiple' eventDateType
        [Sequelize.Op.or]: [
          { 
            eventDateType: { [Sequelize.Op.in]: ["full", "half"] },
            eventDate: { [Sequelize.Op.gte]: currentDate } // eventDate >= currentDate
          }
        ]
      },
      include: [
        {
          model: Hall,
          as: 'bookedHall', // Use the correct alias defined in the association
          attributes: ['id', 'name', 'location'] // Specify which attributes to include
        }
      ]
    });

    // Return the bookings if found, otherwise return an empty array
    console.log(bookings.startTime);
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Hall, as: 'bookedHall' }, // Correct alias
        { model: User, as: 'user' } // Add alias for User if required
      ]
    });
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    // Fetch the booking by ID
    const booking = await Booking.findOne({
      where: { id: bookingId },
      include: [
        { model: Hall, as: "bookedHall" },
        { model: User, as: "user" },
      ],
    });

    // If the booking is not found, return a 404 response
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Helper function to add a time offset (e.g., +5:30 hours)
    const addTimeOffset = (timeString, offsetMinutes) => {
      if (!timeString) return null; // Handle null or undefined times gracefully
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      const date = new Date(2000, 0, 1, hours, minutes, seconds); // Use a dummy date for TIME values
      return new Date(date.getTime() + offsetMinutes * 60 * 1000).toISOString(); // Return ISO string
    };

    // Adjust startTime and endTime with the time offset
    const updatedStartTime = addTimeOffset(booking.startTime, 330); // +5:30 hours = 330 minutes
    const updatedEndTime = addTimeOffset(booking.endTime, 330);

    // Log times for debugging
    console.log("Stored Booking Times:", booking.startTime, booking.endTime);
    console.log("Updated Booking Times:", updatedStartTime, updatedEndTime);

    // Respond with the booking data, including adjusted start and end times
    res.json({
      booking: {
        ...booking.toJSON(), // Convert Sequelize model instance to plain JSON
        startTime: updatedStartTime, // Replace startTime with adjusted value
        endTime: updatedEndTime, // Replace endTime with adjusted value
      },
    });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};


const getBookingByUserId = async (req, res, next) => {
  try {
    const userId = req.rootUser.id; // Assuming `rootUser` contains the current user’s details
    //console.log("User ID ",userId);
    // Fetching bookings for a specific user
    const bookings = await Booking.findAll({
      where: { userId: userId },
      include: [
        {
          model: Hall,
          as: 'bookedHall', // Ensure this alias matches the one defined in your model
          attributes: ['id', 'name', 'location', 'capacity', 'amenities'] // Select specific fields
        },
        {
          model: User,
          as: 'user', // Ensure this alias matches the one defined in your model
          attributes: ['id', 'name', 'email'] // Select specific fields
        }
      ]
    });
    //console.log("123",bookings.length);
    // If no bookings are found for the user
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user',bookings});
    }
    // console.log("dfjnergk",bookings);
    // Return the bookings with associated data
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};








const getBookingAdmin = async (req, res, next) => {
  try {
    let statusArray = ["Approved By HOD", "Approved By Admin", "Rejected By Admin"];
    const adminEmail = req.rootUser.email;
    const userId = req.rootUser.id; // Assuming `rootUser.id` is the user's ID

    // Check if the HOD feature is enabled
    if (process.env.REACT_APP_HOD_FEATURE !== "true") {
      statusArray.unshift("Request Sent"); // Add "Request Sent" at the beginning if HOD feature is off
    }

    // Find bookings that match the criteria
    const bookings = await Booking.findAll({
      where: {
        isApproved: {
          [Op.in]: statusArray // Use Op.in for matching status
        },
        [Op.or]: [
          { email: adminEmail }, // Match bookings where email is the admin's email
          { '$bookedHall.hallCreater$': adminEmail } // Match bookings where hallCreater is the admin's email
        ]
      },
      include: [
        {
          model: Hall,
          as: 'bookedHall' // Include the associated BookedHall model
        },
        {
          model: User,
          as: 'user' // Include the associated User model
        }
      ]
    });

    // Return the bookings if found
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

const getBookingHod = async (req, res, next) => {
  const hodDepartment = req.rootUser.department; // Get the department of the HOD

  try {
    // Find bookings where the department matches and include the associated BookedHall
    const bookings = await Booking.findAll({
      where: { department: hodDepartment }, // Filter by department
      include: [
        {
          model: Hall,
          as: 'bookedHall' // Include the associated BookedHall model
        }
      ]
    });

    // Return the bookings if found
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};





const updateBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const {
      eventName, eventDate, startTime, endTime, eventDateType,
      eventStartDate, eventEndDate, isApproved, rejectionReason
    } = req.body;

    // Find the booking by its primary key
    const booking = await Booking.findByPk(bookingId, {
      include: [
        {
          model: Hall,
          as: 'bookedHall' // Include associated BookedHall
        }
      ]
    });

    // If booking is not found
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the booking with the provided fields
    await booking.update({
      eventName, eventDate, startTime, endTime, eventDateType,
      eventStartDate, eventEndDate, isApproved, rejectionReason
    });

    // Send email based on the updated approval status
    if (isApproved === 'Approved By Admin') {
      sendApprovalEmail(booking, bookingId);
    } else if (isApproved === 'Rejected By Admin') {
      sendRejectionEmail(booking, bookingId, rejectionReason);
    }

    res.json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    next(error);
  }
};



const sendApprovalEmail = async (booking, bookingId) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: booking.email,
      subject: 'Booking Request Approved',
      html: sendApprovalEmailTemplate(booking.eventName, booking.bookedHallName, booking.organizingClub, booking.institution, booking.department, bookingId)
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



const sendRejectionEmail = async (booking, bookingId, rejectionReason) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: booking.email,
      subject: 'Booking Request Rejected',
      html: sendRejectionEmailTemplate(booking.eventName, booking.bookedHallName, booking.organizingClub, booking.institution, booking.department, bookingId, rejectionReason)
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendRejectionEmailTemplate = (eventName, bookedHallName, organizingClub, institution, department, bookingId, rejectionReason) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Booking Request Rejected</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
      <style>
        /* General Styles */
        body {
          font-family: 'Inter', Arial, sans-serif;
          background-color: #F0F4F8;
          margin: 0;
          padding: 20px;
          color: #1a1a1a;
          line-height: 1.6;
        }

        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #034da2 0%, #0056b8 100%);
          color: white;
          text-align: left;
          padding: 40px 30px;
          border-bottom: 5px solid #EF4444;
        }

        .logo {
          margin-bottom: 25px;
        }

        .logo img {
          height: 40px;
        }

        h1 {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 15px 0;
          color: #ffffff;
        }

        .header p {
          font-size: 16px;
          margin: 0;
          opacity: 0.95;
          color: #E8F0FE;
        }

        .content {
          padding: 30px;
          background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%);
        }

        .details {
          background-color: #FFFFFF;
          border: 1px solid #E1E8F5;
          border-radius: 12px;
          padding: 25px;
          margin: 20px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .detail-row {
          margin-bottom: 20px;
          border-bottom: 1px solid #E1E8F5;
          padding-bottom: 15px;
        }

        .detail-row:last-child {
          margin-bottom: 0;
          border-bottom: none;
          padding-bottom: 0;
        }

        .detail-label {
          font-size: 14px;
          color: #034da2;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .detail-value {
          font-size: 16px;
          color: #2D3748;
          font-weight: 500;
        }

        .reason-box {
          background-color: #FEF2F2;
          border: 1px solid #EF4444;
          border-radius: 12px;
          padding: 25px;
          margin: 20px 0;
        }

        .reason-label {
          font-size: 14px;
          color: #DC2626;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .reason-text {
          font-size: 16px;
          color: #2D3748;
          line-height: 1.6;
        }

        .button {
          display: inline-block;
          background: linear-gradient(135deg, #034da2 0%, #0056b8 100%);
          padding: 16px 32px;
          text-align: center;
          text-decoration: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          margin: 25px 0;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(3, 77, 162, 0.2);
          color: #ffffff !important;
          width: 100%;
          box-sizing: border-box;
        }

        .button:hover {
          background: linear-gradient(135deg, #0056b8 0%, #034da2 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(3, 77, 162, 0.25);
          color: #ffffff !important;
        }

        .button span {
          color: #ffffff !important;
        }

        .footer {
          text-align: center;
          padding: 30px;
          background-color: #F8FAFF;
          border-top: 1px solid #E1E8F5;
        }

        .footer p {
          margin: 0;
          color: #5A6C87;
          font-size: 14px;
        }

        /* Status Badge */
        .status-badge {
          display: inline-block;
          background-color: #EF4444;
          color: white;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          margin-top: 15px;
          box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }

          .header {
            padding: 30px 20px;
          }

          .content {
            padding: 20px;
          }

          .details {
            padding: 15px;
          }

          .button {
            display: block;
            text-align: center;
            padding: 14px 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Request Rejected</h1>
          <p>Your venue booking request has been rejected. Please review the details below.</p>
          <div class="status-badge">Rejected</div>
        </div>

        <div class="content">
          <div class="reason-box">
            <div class="reason-label">Reason for Rejection</div>
            <div class="reason-text">${rejectionReason}</div>
          </div>

          <div class="details">
            <div class="detail-row">
              <div class="detail-label">Event Name</div>
              <div class="detail-value">${eventName}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Venue</div>
              <div class="detail-value">${bookedHallName}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Description</div>
              <div class="detail-value">${organizingClub}</div>
            </div>


            </div>
          </div>

          <a href="http://${process.env.CLIENT_URL}/bookingsView/${bookingId}" class="button">
            <span>View Booking Details</span>
          </a>
        </div>

        <div class="footer">
          <p>This is an automated message from the ${process.env.INSTITUTION_NAME} Venue Booking System.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};

const sendApprovalEmailTemplate = (eventName, bookedHallName, organizingClub, institution, department, bookingId) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Booking Request Approved</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
      <style>
        /* General Styles */
        body {
          font-family: 'Inter', Arial, sans-serif;
          background-color: #F0F4F8;
          margin: 0;
          padding: 20px;
          color: #1a1a1a;
          line-height: 1.6;
        }

        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #034da2 0%, #0056b8 100%);
          color: white;
          text-align: left;
          padding: 40px 30px;
          border-bottom: 5px solid #22C55E;
        }

        .logo {
          margin-bottom: 25px;
        }

        .logo img {
          height: 40px;
        }

        h1 {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 15px 0;
          color: #ffffff;
        }

        .header p {
          font-size: 16px;
          margin: 0;
          opacity: 0.95;
          color: #E8F0FE;
        }

        .content {
          padding: 30px;
          background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%);
        }

        .details {
          background-color: #FFFFFF;
          border: 1px solid #E1E8F5;
          border-radius: 12px;
          padding: 25px;
          margin: 20px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .detail-row {
          margin-bottom: 20px;
          border-bottom: 1px solid #E1E8F5;
          padding-bottom: 15px;
        }

        .detail-row:last-child {
          margin-bottom: 0;
          border-bottom: none;
          padding-bottom: 0;
        }

        .detail-label {
          font-size: 14px;
          color: #034da2;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .detail-value {
          font-size: 16px;
          color: #2D3748;
          font-weight: 500;
        }

        .button {
          display: inline-block;
          background: linear-gradient(135deg, #034da2 0%, #0056b8 100%);
          padding: 16px 32px;
          text-align: center;
          text-decoration: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          margin: 25px 0;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(3, 77, 162, 0.2);
          color: #ffffff !important;
          width: 100%;
          box-sizing: border-box;
        }

        .button:hover {
          background: linear-gradient(135deg, #0056b8 0%, #034da2 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(3, 77, 162, 0.25);
          color: #ffffff !important;
        }

        .button span {
          color: #ffffff !important;
        }

        .footer {
          text-align: center;
          padding: 30px;
          background-color: #F8FAFF;
          border-top: 1px solid #E1E8F5;
        }

        .footer p {
          margin: 0;
          color: #5A6C87;
          font-size: 14px;
        }

        /* Status Badge */
        .status-badge {
          display: inline-block;
          background-color: #22C55E;
          color: white;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          margin-top: 15px;
          box-shadow: 0 2px 6px rgba(34, 197, 94, 0.3);
        }

        /* Highlight Box */
        .highlight-box {
          background: linear-gradient(135deg, #F8FAFF 0%, #E8F0FE 100%);
          border-left: 4px solid #22C55E;
          padding: 15px;
          margin-top: 20px;
          border-radius: 0 8px 8px 0;
        }

        /* Responsive Design */
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }

          .header {
            padding: 30px 20px;
          }

          .content {
            padding: 20px;
          }

          .details {
            padding: 15px;
          }

          .button {
            display: block;
            text-align: center;
            padding: 14px 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Request Approved</h1>
          <p>Your venue booking request has been approved. Please review the details below.</p>
          <div class="status-badge">Approved</div>
        </div>

        <div class="content">
          <div class="details">
            <div class="detail-row">
              <div class="detail-label">Event Name</div>
              <div class="detail-value">${eventName}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Venue</div>
              <div class="detail-value">${bookedHallName}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Description</div>
              <div class="detail-value">${organizingClub}</div>
            </div>
          </div>

          <div class="highlight-box">
            Your booking has been confirmed. You can view the complete details by clicking the button below.
          </div>

          <a href="http://${process.env.CLIENT_URL}/bookingsView/${bookingId}" class="button">
            <span>View Booking Details</span>
          </a>
        </div>

        <div class="footer">
          <p>This is an automated message from the ${process.env.INSTITUTION_NAME} Venue Booking System.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};

    const deleteBooking = async (req, res, next) => {
      try {
        const { bookingId } = req.params;
    
        // Delete the booking by primary key (id)
        const deletedCount = await Booking.destroy({
          where: { id: bookingId }  // Use the 'id' field as the primary key
        });
    
        // Check if any rows were affected
        if (deletedCount === 0) {
          return res.status(404).json({ message: 'Booking not found' });
        }
    
        res.json({ message: 'Booking deleted successfully' });
      } catch (error) {
        console.error('Error deleting booking:', error);
        next(error);
      }
    };
    

    const getalllt = async (req, res) => {
      try {
          const { eventDate, startTime, endTime } = req.body;
          console.log("Request received:", { eventDate, startTime, endTime });
  
          if (!eventDate || !startTime || !endTime) {
              return res.status(400).json({ message: "Please provide eventDate, startTime, and endTime" });
          }
  
          const formattedEventDate = eventDate.split('T')[0]; // Extract only the date part (YYYY-MM-DD)
          console.log("Formatted Event Date:", formattedEventDate);
  
          const extractTime = (isoTime) => {
              const timePart = isoTime.split('T')[1].split('.')[0]; // Extract time part (HH:mm:ss)
              return timePart;
          };
  
          const startTimeQuery = extractTime(startTime); // Convert to HH:mm:ss
          const endTimeQuery = extractTime(endTime); // Convert to HH:mm:ss
          console.log("Start Time Query:", startTimeQuery);
          console.log("End Time Query:", endTimeQuery);
  
          if (startTimeQuery >= endTimeQuery) {
              return res.status(400).json({ message: "End time must be later than start time" });
          }
  
          // Query for overlapping bookings
          const overlappingBookings = await Booking.findAll({
              where: {
                  [Op.and]: [
                      {
                          // Check if the requested eventDate falls within the multi-day booking range
                          [Op.or]: [
                              {
                                  eventDateType: "multiple",
                                  eventStartDate: { [Op.lte]: formattedEventDate },
                                  eventEndDate: { [Op.gte]: formattedEventDate },
                              },
                              // Check for single-day bookings
                              Sequelize.where(Sequelize.fn('DATE', Sequelize.col('eventDate')), formattedEventDate),
                          ],
                      },
                      {
                          [Op.or]: [
                              // Check for overlapping time ranges
                              {
                                  startTime: { [Op.lt]: endTimeQuery },
                                  endTime: { [Op.gt]: startTimeQuery },
                              },
                              {
                                  startTime: { [Op.gte]: startTimeQuery },
                                  endTime: { [Op.lte]: endTimeQuery },
                              },
                          ],
                      },
                  ],
              },
              attributes: ['bookedHallId'],
          });
  
          // console.log("Overlapping bookings:", overlappingBookings);
  
          // // Extract booked hall IDs
           const bookedHallIds = overlappingBookings.map((booking) => booking.bookedHallId);
          // console.log("Booked Hall IDs:", bookedHallIds);
  
          // Find available halls
          const availableHalls = await Hall.findAll({
              where: { id: { [Op.notIn]: bookedHallIds } },
          });
  
          if (availableHalls.length === 0) {
              return res.status(200).json({ message: "No halls available for the selected date and time" });
          }
  
          res.status(200).json({ availableHalls, message: "Halls fetched successfully" });
      } catch (error) {
          console.error("Error fetching available halls:", error);
          res.status(500).json({ message: "Internal server error" });
      }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    
      
    
  export default { upload, createBooking, getBookings, getBookingById, updateBooking, deleteBooking, getBookingByUserId, getEvents, getBookingAdmin, getBookingHod, getalllt };



