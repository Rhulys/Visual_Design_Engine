export type NodeType = 'container' | 'text' | 'button';

export interface CanvasNode {
    id: string;
    type: NodeType;
    props: {
        text?: string;
        style?: React.CSSProperties;
    }
    children?: CanvasNode[]
}