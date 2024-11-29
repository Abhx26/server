import express from 'express';
import bookingController from '../controllers/bookingController.js';
import authenticate from "../middleware/authenticate.js";


const router = express.Router();


router.get('/bookings', authenticate, bookingController.getBookings);
router.get('/bookingsAdmin',authenticate,bookingController.getBookingAdmin);
router.get('/bookingsHod', authenticate, bookingController.getBookingHod);

router.get('/events',  bookingController.getEvents);
router.get('/bookingsView/:bookingId',authenticate, bookingController.getBookingById);
 router.get('/bookings/:id', bookingController.getBookingById);
router.get('/bookingsFaculty',authenticate,  bookingController.getBookingByUserId);
router.post('/bookings',authenticate, bookingController.createBooking);
router.put('/bookingsEdit/:bookingId',authenticate, bookingController.updateBooking);
router.delete('/bookings/:bookingId', bookingController.deleteBooking);
router.post('/showlt', bookingController.getalllt);
router.post('/upload',bookingController.upload);


export default router;
