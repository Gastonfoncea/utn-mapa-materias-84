import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import SubjectNode from '@/components/SubjectNode';
import { ControlPanel } from '@/components/ControlPanel';
import { subjects, edges } from '@/data/subjects';
import { useSubjectLogic } from '@/hooks/useSubjectLogic';

const nodeTypes = {
  subject: SubjectNode,
};

const Index = () => {
  const { 
    subjects: currentSubjects, 
    cycleSubjectStatus, 
    resetAllSubjects, 
    simulateSemester, 
    stats 
  } = useSubjectLogic(subjects);

  // Convertir subjects a nodes para react-flow
  const initialNodes: Node[] = currentSubjects.map(subject => ({
    id: subject.id,
    type: 'subject',
    position: subject.position,
    data: {
      name: subject.name,
      year: subject.year,
      status: subject.status,
      code: subject.code,
    },
    draggable: false,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(edges);

  // Actualizar nodos cuando cambien los subjects
  const updateNodes = useCallback(() => {
    const updatedNodes = currentSubjects.map(subject => ({
      id: subject.id,
      type: 'subject',
      position: subject.position,
      data: {
        name: subject.name,
        year: subject.year,
        status: subject.status,
        code: subject.code,
      },
      draggable: false,
    }));
    setNodes(updatedNodes);
  }, [currentSubjects, setNodes]);

  // Actualizar nodos cuando cambien los subjects
  React.useEffect(() => {
    updateNodes();
  }, [updateNodes]);

  // Manejar clicks en nodos
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    cycleSubjectStatus(node.id);
  }, [cycleSubjectStatus]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-utn-blue-light to-background relative overflow-hidden">
      <ControlPanel
        onResetAll={resetAllSubjects}
        onSimulateSemester={simulateSemester}
        stats={stats}
      />
      
      <ReactFlow
        nodes={nodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ 
          padding: 20,
          minZoom: 0.5,
          maxZoom: 1.2 
        }}
        className="w-full h-full touch-pan-y"
        minZoom={0.2}
        maxZoom={1.8}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        panOnScroll={false}
        preventScrolling={true}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background 
          gap={15} 
          size={0.8} 
          color="#e0e7ff" 
        />
        <Controls 
          className="bg-white/90 backdrop-blur border-utn-blue !bottom-4 !right-4 !left-auto !top-auto" 
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap 
          className="!hidden sm:!block bg-white/90 backdrop-blur border border-utn-blue rounded-lg !bottom-4 !left-4 !right-auto !top-auto !w-32 !h-24"
          maskColor="#f0f4f8"
          nodeColor={(node) => {
            const status = node.data?.status;
            switch (status) {
              case 'approved': return '#4ade80';
              case 'failed': return '#ef4444';
              case 'current': return '#facc15';
              case 'available': return '#3b82f6';
              default: return '#9ca3af';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default Index;
