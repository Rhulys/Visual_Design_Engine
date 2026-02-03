import React, { memo } from "react";
import styled from "styled-components";
import type { CanvasNode } from "../types";
import { useCanvasStore } from "../../store/useCanvasStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const StyledElement = styled.div<{ $isSelected: boolean }>`
    position: relative;
    outline: ${props => props.$isSelected ? '2px solid #007acc' : '1px dashed #444'}
    transition: outline 0.1s;

    &:hover {
        outline: 2px solid #555
    }
`;

export const RenderNode: React.FC<{ node: CanvasNode }> = memo(({ node }) => {
    const { selectedNodeId, setSelectedNode } = useCanvasStore();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: node.id
    })

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedNode(node.id)
    };

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        ...node.props.style,
    }

    return (
        <StyledElement
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            $isSelected={selectedNodeId === node.id}
            style={style}
            onClick={handleClick}
        >
            {node.props.text}

            {node.children?.map((child) => (
                <RenderNode key={child.id} node={child} />
            ))}
        </StyledElement>
    )
})