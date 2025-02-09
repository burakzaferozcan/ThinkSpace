import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MindmapState {
  nodes: any[];
  edges: any[];
}

const initialState: MindmapState = {
  nodes: [],
  edges: [],
};

export const mindmapSlice = createSlice({
  name: 'mindmap',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<any>) => {
      state.nodes.push(action.payload);
    },
    addEdge: (state, action: PayloadAction<any>) => {
      state.edges.push(action.payload);
    },
    updateNode: (state, action: PayloadAction<any>) => {
    },
    deleteNode: (state, action: PayloadAction<string>) => {
    },
  },
});

export const { addNode, addEdge, updateNode, deleteNode } = mindmapSlice.actions;

export default mindmapSlice.reducer;