import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import { getAddressBook, createAddressBook, getAddressById } from '../controllers/addressBook.js';

router.route('/').post(createAddressBook).get(getAddressBook)
router.route('/:id').get(getAddressById)


export default router;