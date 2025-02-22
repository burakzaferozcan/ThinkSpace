"use client"
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNode, addEdge, updateNodeText, updateNodePosition, removeNode, removeEdge } from '../../redux/features/mindmap/mindmapSlice';
import { RootState } from '../../redux/store';
import NodeComponent from '../molecules/Node';
import Edge from '../molecules/Edge';
import { Node as MindMapNode } from '../../redux/features/mindmap/mindmapSlice';

export const MindMapCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.mindmap.nodes);
  const edges = useSelector((state: RootState) => state.mindmap.edges);

  const [sourceNode, setSourceNode] = useState<any | null>(null);

  const previousNodes = useRef<MindMapNode[]>([]);
  const previousEdges = useRef< {source: MindMapNode, target: MindMapNode, id: string}[] >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Çizim işlemleri burada yapılacak
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Düğümleri çiz
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = 'lightblue';
      ctx.fill();
      ctx.stroke();
    });

    // Kenarları çiz
    edges.forEach(edge => {
      ctx.beginPath();
      ctx.moveTo(edge.source.x, edge.source.y);
      ctx.lineTo(edge.target.x, edge.target.y);
      ctx.stroke();
    });

    previousNodes.current = nodes;
    previousEdges.current = edges;
  }, [nodes, edges]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    dispatch(addNode({ x, y, text: 'New Node' }));
  };

  const handleNodeClick = (node: any) => {
    if (sourceNode === null) {
      setSourceNode(node);
    } else {
      dispatch(addEdge({ source: sourceNode, target: node }));
      setSourceNode(null);
    }
  };

  const handleNodeTextChange = (id: string, newText: string) => {
    dispatch(updateNodeText({ id, text: newText }));
  };

  const handleNodeDrag = (id: string, deltaX: number, deltaY: number) => {
    dispatch(updateNodePosition({ id, deltaX, deltaY }));
  };

  const handleRemoveNode = (id: string) => {
    dispatch(removeNode(id));
  };

  const handleRemoveEdge = (sourceId: string, targetId: string) => {
    dispatch(removeEdge({ sourceId, targetId }));
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute top-0 left-0"
        onClick={handleCanvasClick}
      />
{nodes.map(node => (
        <NodeComponent
          key={node.id}
          id={node.id}
          x={node.x}
          y={node.y}
          text={node.text}
          onClick={() => handleNodeClick(node)}
          onTextChange={handleNodeTextChange}
          onNodeDrag={handleNodeDrag}
          onRemoveNode={handleRemoveNode} // Silme fonksiyonunu Node'a gönder
        />
      ))}
      {edges.map(edge => (
        <Edge
          key={edge.id}
          source={edge.source}
          target={edge.target}
          onRemoveEdge={handleRemoveEdge} // Silme fonksiyonunu Edge'e gönder
        />
      ))}
    </>
  );
};