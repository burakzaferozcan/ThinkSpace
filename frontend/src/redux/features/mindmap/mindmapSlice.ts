import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Node {
  id: string;
  x: number;
  y: number;
  text: string;
}

interface Edge {
  id: string;
  source: Node;
  target: Node;
}

interface MindmapState {
  nodes: Node[];
  edges: Edge[];
}

const initialState: MindmapState = {
  nodes: [],
  edges: [],
};

const mindmapSlice = createSlice({
  name: 'mindmap',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<{ x: number; y: number; text: string }>) => {
      const { x, y, text } = action.payload;
      const newNode: Node = {
        id: uuidv4(),
        x,
        y,
        text,
      };
      state.nodes.push(newNode);
    },
    addEdge: (state, action: PayloadAction<{ source: Node; target: Node }>) => {
      const { source, target } = action.payload;
      const newEdge: Edge = {
        id: uuidv4(), // Benzersiz ID oluştur
        source,
        target,
      };
      state.edges.push(newEdge);
    },
    updateNodeText: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const node = state.nodes.find(node => node.id === id);
      if (node) {
        node.text = text;
      }
    },
    updateNodePosition: (state, action: PayloadAction<{ id: string; deltaX: number; deltaY: number }>) => {
      const { id, deltaX, deltaY } = action.payload;
      const node = state.nodes.find(node => node.id === id);
      if (node) {
        node.x += deltaX;
        node.y += deltaY;
    
        state.edges.forEach(edge => {
          if (edge.source.id === id) {
            edge.source = { ...node };
          } else if (edge.target.id === id) {
            edge.target = { ...node };
          }
        });
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
      state.edges = state.edges.filter(edge => edge.source.id !== action.payload && edge.target.id !== action.payload);
    },
    removeEdge: (state, action: PayloadAction<{ sourceId: string; targetId: string }>) => {
      state.edges = state.edges.filter(edge => edge.source.id !== action.payload.sourceId || edge.target.id !== action.payload.targetId);
    },
  },
});

export const { addNode, addEdge, updateNodeText, updateNodePosition ,removeEdge,removeNode} = mindmapSlice.actions;

export default mindmapSlice.reducer;