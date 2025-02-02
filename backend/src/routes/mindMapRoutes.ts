import express from 'express';
import {
  create,
  getAll,
  getById,
  update,
  deleteById,
} from '../controllers/mindMapController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// @route   POST api/mindmaps
// @desc    Create a mind map
// @access  Private
router.post('/', authMiddleware, create);

// @route   GET api/mindmaps
// @desc    Get all mind maps
// @access  Private
router.get('/', authMiddleware, getAll);

// @route   GET api/mindmaps/:id
// @desc    Get a mind map by id
// @access  Private
router.get('/:id', authMiddleware, getById);

// @route   PUT api/mindmaps/:id
// @desc    Update a mind map
// @access  Private
router.put('/:id', authMiddleware, update);

// @route   DELETE api/mindmaps/:id
// @desc    Delete a mind map
// @access  Private
router.delete('/:id', authMiddleware, deleteById);

export default router;