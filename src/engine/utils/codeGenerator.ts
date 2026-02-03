import type { CanvasNode } from "../types";

export const generateCode = (node: CanvasNode): string => {
    const styledcomponents: string[] = [];

    const processNode = (currentNode: CanvasNode): string => {
        const name = `Styled${currentNode.id.replace(/[^a-zA-Z0-9]/g, '')}`;
        const tag = currentNode.type === 'button' ? 'button' : 'div';

        const cssContent = Object.entries(currentNode.props.style || {})
            .map(([prop, value]) => ` ${prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}: ${value};`)
            .join('\n');

        styledcomponents.push(`const ${name} = styled.${tag}\`${cssContent}\`;`)

        const childrenJSX = currentNode.children?.map(child => processNode(child)).join('\n') || '';
        
        return `<${name}>
            ${currentNode.props.text || ''}
            ${childrenJSX}
            </${name}>`;
    }

    const jsxStructure = processNode(node);

    return `import styled from 'styled-components';

    ${styledcomponents.join('\n\n')}

    export const GeneratedLayout = () => {
        return (
            ${jsxStructure}
        );
    };
};`;
};