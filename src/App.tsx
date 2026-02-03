import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { getAllNodeIds, useCanvasStore } from './store/useCanvasStore';
import { RenderNode } from './engine/core/RenderNode';
import { Inspector } from './components/Inspector/Inspector';
import { ElementButton } from './components/Sidebar/ElementButton';
import React, { useState } from 'react';
import { ExportModal } from './components/ExportModal/ExportModal';
import { generateCode } from './engine/utils/codeGenerator';
import { LayersPanel } from './components/Sidebar/LayersPanel';
import { DndContext, closestCenter, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const EditorLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  height: 100vh;
  width: 100vw
`;

const Sidebar = styled.aside`
  background-color: #252526;
  border-right: 1px solid #333;
  padding: 20px;
`

const CanvasArea = styled.main`
  background-color: #121212;
  overflow: auto;
  padding: 40px;
  display: flex;
  justify-content: center;
`

const InspectorArea = styled.aside`
  background-color: #252526;
  border-left: 1px solid #333;
  padding: 20px
`;

function App() {
  const { tree, moveNode, resetCanvas } = useCanvasStore()
  const { selectedNodeId, addNode } = useCanvasStore();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const allIds = React.useMemo(() => getAllNodeIds(tree), [tree])

  const handleAddElement = (type: 'container' | 'button' | 'text') => {
    const targetId = selectedNodeId || 'root';
    addNode(targetId, type)
  }

  const handleExport = () => {
    const code = generateCode(tree)
    setGeneratedCode(code);
    setIsModalOpen(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveNode(active.id as string, over.id as string)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )

  return (
    <>
      <GlobalStyles />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <EditorLayout>
          <Sidebar>
            <h3>Elementos</h3>
            <ElementButton onClick={() => handleAddElement('container')}>+ Container</ElementButton>
            <ElementButton onClick={() => handleAddElement('button')}>+ Botão</ElementButton>
            <ElementButton onClick={() => handleAddElement('text')}>+ Texto</ElementButton>

            <hr style={{ margin: '20px 0', borderColor: '#444' }} />

            <h3>Ações</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

              <button
                onClick={handleExport}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: '#28a745',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Exportar Código
              </button>
              <button
                onClick={() => {
                  if (confirm("Tem certeza que deseja limpar todo o canvas?")) {
                    resetCanvas()
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#dc3545',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '4px'
                }}
              >
                🗑️ LIMPAR CANVAS
              </button>
            </div>

            <h3>Camadas</h3>
            <div style={{ marginTop: '10px', maxHeight: '300px', overflowY: 'auto' }}>
              <LayersPanel node={tree} />
            </div>

          </Sidebar>

          <CanvasArea>
            <SortableContext items={getAllNodeIds(tree)} strategy={verticalListSortingStrategy}>
              <RenderNode node={tree} />
            </SortableContext>
          </CanvasArea>

          <InspectorArea>
            <Inspector />
          </InspectorArea>
        </EditorLayout>
      </DndContext>
      {isModalOpen && (
        <ExportModal code={generatedCode} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}

export default App;