import { Request, Response } from 'express';
import {
  createMindMap,
  getMindMaps,
  getMindMapById,
  updateMindMap,
  deleteMindMap,
} from '../services/mindMapService';
import { IUser } from '../models/user';

const create = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    // @ts-ignore
    const owner = req.user.id as IUser['_id'];
    const mindMap = await createMindMap(title, owner);
    res.status(201).json(mindMap);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const owner = req.user.id as IUser['_id'];
    const mindMaps = await getMindMaps(owner);
    res.json(mindMaps);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const owner = req.user.id as IUser['_id'];
    const mindMap = await getMindMapById(id, owner);
    if (!mindMap) {
      res.status(404).json({ message: 'Mind map not found' });
      return;
    }
    res.json(mindMap);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, nodes, edges } = req.body;
    // @ts-ignore
    const owner = req.user.id as IUser['_id'];
    const mindMap = await updateMindMap(id, title, nodes, edges, owner);
    if (!mindMap) {
      res.status(404).json({ message: 'Mind map not found' });
      return;
    }
    res.json(mindMap);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const owner = req.user.id as IUser['_id'];
    const mindMap = await deleteMindMap(id, owner);
    if (!mindMap) {
      res.status(404).json({ message: 'Mind map not found' });
      return;
    }
    res.json(mindMap);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export { create, getAll, getById, update, deleteById };