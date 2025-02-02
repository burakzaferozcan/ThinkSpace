import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';

interface IMindMap extends Document {
  title: string;
  nodes: any[];
  edges: any[];
  owner: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const MindMapSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    nodes: { type: [Object], default: [] },
    edges: { type: [Object], default: [] },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const MindMap = mongoose.model<IMindMap>('MindMap', MindMapSchema);

export default MindMap;
export type { IMindMap };