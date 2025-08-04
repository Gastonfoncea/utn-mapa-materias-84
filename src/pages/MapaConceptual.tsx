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

import SubjectNode, { SubjectStatus } from '@/components/SubjectNode';
import { ControlPanel } from '@/components/ControlPanel';
import { subjects, edges } from '@/data/subjects';
import { useSubjectLogic } from '@/hooks/useSubjectLogic';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const nodeTypes = {
  subject: SubjectNode,
};

const MapaConceptual = () => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const { 
    subjects: currentSubjects, 
    cycleSubjectStatus,
    updateSubjectStatus,
    handleSpecialAction,
    clearHighlights,
    resetAllSubjects, 
    stats,
    highlightedPrereqs,
    isSubjectReadyToTest,
    decrementAttempts
  } = useSubjectLogic(subjects);

  // Convertir subjects a nodes para react-flow
  const initialNodes: Node[] = currentSubjects.map(subject => {
    const isHighlighted = highlightedPrereqs.some(prereq => prereq.id === subject.id);
    const hasActiveHighlights = highlightedPrereqs.length > 0;
    const shouldFade = hasActiveHighlights && !isHighlighted;
    
    return {
      id: subject.id.toString(),
      type: 'subject',
      position: subject.position,
      data: {
        nombre: subject.nombre,
        nivel: subject.nivel,
        status: subject.status,
        modalidad: subject.modalidad,
        electiva: subject.electiva,
        onClick: () => cycleSubjectStatus(subject.id),
        onStatusChange: (status: SubjectStatus) => updateSubjectStatus(subject.id, status),
        onSpecialAction: (action: 'cursar' | 'rendir' | 'normal') => {
          handleSpecialAction(subject.id, action);
        },
        onClearHighlights: clearHighlights,
        isSpecial: subject.correlativasRendir.length > 0,
        canBeRendered: isSubjectReadyToTest(subject, currentSubjects),
        isHighlighted: isHighlighted,
        highlightType: highlightedPrereqs.find(prereq => prereq.id === subject.id)?.type,
        attempts: subject.attempts,
        onDecrementAttempts: () => decrementAttempts(subject.id),
        shouldFade: shouldFade
      },
      draggable: false,
    };
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(edges);

  // Actualizar nodos cuando cambien los subjects
  const updateNodes = useCallback(() => {
    const updatedNodes = currentSubjects.map(subject => {
      const isHighlighted = highlightedPrereqs.some(prereq => prereq.id === subject.id);
      const hasActiveHighlights = highlightedPrereqs.length > 0;
      const shouldFade = hasActiveHighlights && !isHighlighted;
      
      return {
        id: subject.id.toString(),
        type: 'subject',
        position: subject.position,
        data: {
          nombre: subject.nombre,
          nivel: subject.nivel,
          status: subject.status,
          modalidad: subject.modalidad,
          electiva: subject.electiva,
          onClick: () => cycleSubjectStatus(subject.id),
          onStatusChange: (status: SubjectStatus) => updateSubjectStatus(subject.id, status),
          onSpecialAction: (action: 'cursar' | 'rendir' | 'normal') => {
            handleSpecialAction(subject.id, action);
          },
          onClearHighlights: clearHighlights,
          isSpecial: subject.correlativasRendir.length > 0,
          canBeRendered: isSubjectReadyToTest(subject, currentSubjects),
          isHighlighted: isHighlighted,
          highlightType: highlightedPrereqs.find(prereq => prereq.id === subject.id)?.type,
          attempts: subject.attempts,
          onDecrementAttempts: () => decrementAttempts(subject.id),
          shouldFade: shouldFade
        },
        draggable: false,
      };
    });
    setNodes(updatedNodes);
  }, [currentSubjects, setNodes, cycleSubjectStatus, updateSubjectStatus, handleSpecialAction, clearHighlights, highlightedPrereqs, isSubjectReadyToTest, decrementAttempts]);

  // Actualizar nodos cuando cambien los subjects
  React.useEffect(() => {
    updateNodes();
  }, [updateNodes]);


  return (
    <div className="w-full h-screen bg-gradient-to-br from-utn-blue-light to-background relative overflow-hidden">
      {/* Panel de autenticación */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
        {loading ? (
          <div className="text-sm text-white">Cargando...</div>
        ) : user ? (
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur rounded-lg px-4 py-2">
            <div className="flex items-center gap-2">
              {user.user_metadata?.avatar_url && (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Avatar" 
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span className="text-sm font-medium text-foreground">
                {user.user_metadata?.full_name || user.email}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={signOut}
              className="text-xs"
            >
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <Button 
            onClick={signInWithGoogle}
            className="bg-white/90 backdrop-blur text-foreground hover:bg-white"
          >
            Iniciar sesión con Google
          </Button>
        )}
      </div>

      <ControlPanel 
        onResetAll={resetAllSubjects}
        stats={stats}
      />
      
      <ReactFlow
        nodes={nodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        
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
        zoomOnDoubleClick={false}
        panOnScroll={false}
        preventScrolling={true}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Background 
          gap={15} 
          size={0.8} 
          color="#9ca3af40" 
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

export default MapaConceptual;