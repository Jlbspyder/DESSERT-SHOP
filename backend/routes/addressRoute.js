import express from 'express';
const router = express.Router();
import { getAddress, getAddressById } from '../controllers/addressController.js';

router.route('/').get(getAddress)
router.route('/:id').get(getAddressById)


export default router;