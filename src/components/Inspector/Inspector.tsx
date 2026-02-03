import React from "react";
import styled from "styled-components";
import { useCanvasStore } from "../../store/useCanvasStore";

const InspectorContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px
`;

const Tag = styled.span`
    background: #007acc;
    padding: 2px 8px;
    border-radius: 4px
    font-size: 12px;
    font-weight: bold;
`;

export const Inspector: React.FC = () => {
    const { selectedNodeId, tree, updateNodeStyle } = useCanvasStore()

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedNodeId) {
            updateNodeStyle(selectedNodeId, { backgroundColor: e.target.value })
        }
    }
    const handlePaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedNodeId) {
            updateNodeStyle(selectedNodeId, { padding: e.target.value + 'px' })
        }
    }

    return (
        <InspectorContainer>
            <h3>Propriedades</h3>
            <hr style={{ borderColor: '#444' }} />

            {selectedNodeId ? (
                <div>
                    <p>Elemento selecionado:</p>
                    <Tag>{selectedNodeId}</Tag>

                    <div style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Cor de Fundo</label>
                        <input
                            type="color"
                            onChange={handleColorChange}
                            style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Padding</label>
                        <input
                            type="number"
                            placeholder="Digite o valor para adicionar"
                            onChange={handlePaddingChange}
                            style={{ width: '100%', height: '40px', cursor: 'pointer', paddingLeft: '5px' }}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Direção (Flex)</label>
                        <select
                            onChange={(e) => updateNodeStyle(selectedNodeId, { flexDirection: e.target.value as any, display: 'flex' })}
                            style={{ width: '100%', height: '35px', background: '#333', color: '#fff' }}
                        >
                            <option value="column">Vertical (Column)</option>
                            <option value="row">Horizontal (row)</option>
                        </select>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Alinhamento (Justify)</label>
                        <select
                            onChange={(e) => updateNodeStyle(selectedNodeId, { justifyContent: e.target.value })}
                            style={{ width: '100%', height: '35px', background: '#333', color: '#fff' }}
                        >
                            <option value="flex-start">Início</option>
                            <option value="center">Centro</option>
                            <option value="space-between">Espaçado</option>
                            <option value="flex-end">Fim</option>
                        </select>
                    </div>
                </div>
            ) : (
                <p style={{ color: '#888' }}>
                    Selecione um elemento no canvas para editar.
                </p>
            )}
        </InspectorContainer>
    )
}