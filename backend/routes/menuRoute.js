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
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getMenu).post(protect, admin, createMenu);
router.get('/top', getTopMenu);
router
  .route('/:id')
  .get(getMenuById)
  .put(protect, admin, updateMenu)
  .delete(protect, admin, deleteMenu);
router.route('/:id/reviews').post(protect, createMenuReview);

export default router;
