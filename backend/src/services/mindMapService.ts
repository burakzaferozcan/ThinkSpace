import MindMap, { IMindMap } from '../models/mindMap';
import { IUser } from '../models/user';

const createMindMap = async (title: string, owner: IUser['_id']): Promise<IMindMap> => {
  const mindMap = new MindMap({ title, owner });
  return await mindMap.save();
};

const getMindMaps = async (owner: IUser['_id']): Promise<IMindMap[]> => {
  return await MindMap.find({ owner });
};

const getMindMapById = async (id: string, owner: IUser['_id']): Promise<IMindMap | null> => {
  return await MindMap.findOne({ _id: id, owner });
};

const updateMindMap = async (
  id: string,
  title: string,
  nodes: any[],
  edges: any[],
  owner: IUser['_id']
): Promise<IMindMap | null> => {
  return await MindMap.findOneAndUpdate({ _id: id, owner }, { title, nodes, edges }, { new: true });
};

const deleteMindMap = async (id: string, owner: IUser['_id']): Promise<IMindMap | null> => {
  return await MindMap.findOneAndDelete({ _id: id, owner });
};

export { createMindMap, getMindMaps, getMindMapById, updateMindMap, deleteMindMap };