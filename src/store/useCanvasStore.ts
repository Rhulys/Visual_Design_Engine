import { create } from "zustand";
import type { CanvasNode, NodeType } from "../engine/types";

interface CanvasState {
    tree: CanvasNode;
    selectedNodeId: string | null;
    
    setSelectedNode: (id: string | null) => void;
    updateNodeStyle: (id: string, newStyle: React.CSSProperties) => void;
}

const generateId = () => `node_${Math.random().toString(36).substring(2, 9)}`;

const updateNodeInTree = (node: CanvasNode, id: string, newStyle: React.CSSProperties): CanvasNode => {
    if (node.id === id) {
        return {
            ...node,
            props: {
                ...node.props,
                style: { ...node.props.style, ...newStyle }
            }
        };
    }

    if (node.children) {
        return {
            ...node,
            children: node.children.map(child => updateNodeInTree(child, id, newStyle))
        }
    }

    return  node;
}

export const useCanvasStore = create<CanvasState>((set) => ({
    tree: {
        id: 'root',
        type: 'container',
        props: { style: { display: 'flex', minHeight: '100vh', padding: '20px'} },
        children: [],
    },
    selectedNodeId: null,

    setSelectedNode: (id) => set({ selectedNodeId: id}),

    updateNodeStyle: (id, newStyle) => set((state) => ({ tree: updateNodeInTree(state.tree, id, newStyle) })),

    addNode: (parentId: string, type: NodeType) => set((state) => {
        const newNode: CanvasNode = {
            id: generateId(),
            type,
            props: {
                text: type === 'text' ? 'Novo Texto' : '',
                style: {
                    padding: '10px',
                    backgroundColor: type === 'container' ? '#eee' : 'transparent',
                    minWidth: '50px',
                    minHeight: '20px',
                }
            },
            children: []
        };

        const insertInTree = (node: CanvasNode): CanvasNode => {
            if (node.id === parentId) {
                return { ...node, children: [...(node.children || []), newNode] };
            }
            if (node.children) {
                return { ...node, children: node.children.map(insertInTree) };
            }
            return node;
        }

        return { tree: insertInTree(state.tree)}
    }),

    moveNode: (activeId: string, overId: string) => set((state) => {
        const findAndReorder = (nodes: CanvasNode[]): CanvasNode[] => {
            const activeIdx = nodes.findIndex(n => n.id === activeId);
            const overIdx = nodes.findIndex(n => n.id === overId);

            if (activeIdx !== -1 && overIdx !== -1) {
                const newNodes = [...nodes];
                const [movedItem] = newNodes.splice(activeIdx, 1);
                newNodes.splice(overIdx, 0, movedItem);
                return newNodes;
            }

            return nodes.map(node => ({
                ...node,
                children: node.children ? findAndReorder(node.children) : []
            }));
        };

        return { tree: findAndReorder([state.tree])[0] };
    }),

    resetCanvas: () => set({
        tree: { id: 'root', type: 'container', props: { style: { padding: '20px'} }, children: []},
        selectedNodeId: null
    })
}))


export const getAllNodeIds = (node: CanvasNode): string[] => {
    let ids = [node.id];
    if (node.children) {
        node.children.forEach((child) => {
            ids = [...ids, ...getAllNodeIds(child)]
        })
    }
    return ids
}