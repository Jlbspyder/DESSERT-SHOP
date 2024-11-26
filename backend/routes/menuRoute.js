import express from 'express';
const router = express.Router();
import {
  getMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  createMenuReview,
  getTopMenu,
} from '../controllers/menuController.js';
import checkObjectId from '../middleware/checkObjectId.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getMenu).post(protect, admin, createMenu);
router.get('/top', getTopMenu);
router
  .route('/:id')
  .get(checkObjectId, getMenuById)
  .put(protect, admin, checkObjectId, updateMenu)
  .delete(protect, admin, checkObjectId, deleteMenu);
router.route('/:id/reviews').post(protect, checkObjectId, createMenuReview);

export default router;
