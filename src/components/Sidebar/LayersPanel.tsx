import React from "react";
import styled from "styled-components";
import type { CanvasNode } from "../../engine/types";
import { useCanvasStore } from "../../store/useCanvasStore";

const LayerItem = styled.div<{ $isActiive: boolean; $level: number }>`
    padding: 8px 12px;
    padding-left: ${props => props.$level * 20}px;
    background: ${props => props.$isActiive ? '#37373d' : 'transparent'};
    color: ${props => props.$isActiive ? '#007acc' : '#ccc'};
    cursor: pointer;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-left: 2px solid ${props => props.$isActiive ? '#007acc' : 'trasnparent'}

    &:hover {
        background: #2a2d2e
    }
`;

const Icon = styled.span`
    font-size: 10px;
    opacity: 0.6;
`;

export const LayersPanel: React.FC<{ node: CanvasNode; level?: number }> = ({ node, level = 1 }) => {
    const { selectedNodeId, setSelectedNode } = useCanvasStore();

    return (
        <div>
            <LayerItem
                $isActiive={selectedNodeId === node.id}
                $level={level}
                onClick={() => setSelectedNode(node.id)}
            >
                <Icon>{node.type === 'container' ? '📁' : '📄'}</Icon>
                {node.type.toUpperCase()} <small style={{ opacity: 0.5 }}>[{node.id.slice(-4)}]</small>
            </LayerItem>

            {node.children?.map(child => (
                <LayersPanel key={child.id} node={child} level={level + 1} />
            ))}
        </div>
    );
};