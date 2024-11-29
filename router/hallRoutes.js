import express from 'express';
import hallController from "../controllers/hallController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();


router.get('/halls', hallController.getHalls);
router.get('/halls/:hallId',authenticate, hallController.getHallById);
router.post('/halls',authenticate, hallController.createHall);
router.put('/halls/:hallId',authenticate, hallController.updateHall);
router.delete('/halls/:hallId',authenticate, hallController.deleteHall);

export default router;
